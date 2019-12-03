import { Vector3} from 'three';
import Actor from '../engine/Actor';

class Human extends Actor {
  constructor(props) {
    super({...props, color: '#4ec534'});

    this.updateTimer = 100000;
    this.updateTimerCooldown = 0.05;

    this.speed = 1;
    this.bornAt = Date.now();
    this.weapon = null;
    this.killStreak = 0;

    this.prev = 0;

    this.layers = [
      {
        use: () => this.runFromZombies(),
        bias: 0,
        weight: {
          zombiesAround: 0.5,
          weaponsAround: -0.1,
          weaponInPickupRadius: -0.5,
          haveWeapon: -1,
        }
      },
      {
        use: () => this.scout(),
        bias: 0.1,
        weight: {
          zombiesAround: -1,
          weaponsAround: -1,
          weaponInPickupRadius: -1,
          haveWeapon: 0,
        }
      },
      {
        use: () => this.goToWeapon(),
        bias: 0,
        weight: {
          zombiesAround: -0.8,
          weaponsAround: 1,
          weaponInPickupRadius: -1,
          haveWeapon: -1,
        }
      }
    ];
  }

  runFromZombies() {
    const zombiesAround = this.overlapsWith(this.config.gameState.zombies, 50);
    zombiesAround.sort((a,b) => a.distance > b.distance);
    this.moveTo(zombiesAround[0].actor, true);
  }

  scout() {
    this.mesh.position.x += Math.random();
  }

  pickupWeapon() {
    console.log('should pickup weapon')
  }

  moveTo(actor, runAway=false) {
    console.log(actor)
    const vector = new Vector3();
    vector.subVectors(actor.mesh.position, this.mesh.position);
    vector.normalize();

    if(runAway) {
      vector.negate();
    }

    this.mesh.position.x += this.speed * vector.x;
    this.mesh.position.z += this.speed * vector.z;
  }

  goToWeapon() {
    const weaponsAround = this.overlapsWith(this.config.gameState.weapons, 50);
    weaponsAround.sort((a,b) => a.distance > b.distance);
    this.moveTo(weaponsAround[0].actor);
  }

  shoot() {
    console.log('should shoot')
  }

  calculateScore(layer, input) {
    const { weight, bias } = layer;
    let score = 0;

    for(const key in layer.weight) {
      score += weight[key] * input[key];
    }

    return score + bias || 0;
  }



  update(delta) {
    this.updateTimer += delta;

    if(this.updateTimer < this.updateTimerCooldown) {
      return false
    }

    this.updateTimer = 0;

    const zombiesAround = this.overlapsWith(this.config.gameState.zombies, 50);
    const weaponsAround = this.overlapsWith(this.config.gameState.weapons, 50);
    const weaponsInPickupRadius = this.overlapsWith(this.config.gameState.weapons, 5);

    const input = {
      zombiesAround: zombiesAround.length > 0,
      weaponsAround: weaponsAround.length > 0,
      weaponInPickupRadius: weaponsInPickupRadius.length > 0,
      haveWeapon: !!this.weapon,
    };

    const outputs = this.layers.map((layer) => this.calculateScore(layer, input));

    console.log(outputs)
    const i = outputs.indexOf(Math.max(...outputs));
    this.layers[i].use();
  }
}

export default Human;
