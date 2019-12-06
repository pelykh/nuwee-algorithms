import {Vector3} from 'three';
import Actor from '../engine/Actor';
import Zombie from "./Zombie";

class Human extends Actor {
  constructor(props) {
    super({...props, color: '#4ec534'});
    this.weapon = 0;
    this.killStreak = 0;

    this.layers = [
      {
        use: () => this.runFromZombies(),
        bias: 0,
        weight: {
          zombiesAround: 0.8,
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
          zombiesAround: -0.5,
          weaponsAround: 1,
          weaponInPickupRadius: -1,
          haveWeapon: -10,
        }
      },
      {
        use: () => this.pickupWeapon(),
        bias: 0.5,
        weight: {
          zombiesAround: 0,
          weaponsAround: 0,
          weaponInPickupRadius: 0.5,
          haveWeapon: -100,
        }
      },
      {
        use: () => this.shoot(),
        bias: -1.3,
        weight: {
          zombiesAround: 1,
          weaponsAround: 0,
          weaponInPickupRadius: 0,
          haveWeapon: 1,
        }
      },
    ];
  }

  runFromZombies() {
    const zombiesAround = this.getZombiesAround();
    this.moveTo(zombiesAround[0].actor, true);
  }

  scout() {
    this.moveToPoint(100, 100);
  }

  pickupWeapon() {
    const weaponsAround = this.getWeaponsAround(5);
    const closestWeapon = weaponsAround[0]?.actor;

    if (closestWeapon) {
      closestWeapon.pickup();
      this.weapon = closestWeapon.magazineSize;
    }
  }

  goToWeapon() {
    const weaponsAround = this.getWeaponsAround();
    this.moveTo(weaponsAround[0]?.actor);
  }

  shoot() {
    const zombiesAround = this.getZombiesAround();
    const closestZombie = zombiesAround[0]?.actor;

    if (this.weapon > 0 && closestZombie) {
      closestZombie.kill();
      this.killStreak += 1;
      this.weapon -= 1;
    } else {
      this.scout();
    }
  }

  turnIntoAZombie() {
    const {config} = this;
    const {core, gameState} = config;
    const {position} = this.mesh;

    this.destroy(gameState.humans);

    const zombie = new Zombie({config});
    zombie.delay(3);

    core.spawn(
      zombie,
      position.x, position.z,
      gameState.zombies
    );

    const livedFor = Date.now() - this.bornAt;

    if (livedFor > core.humanRecord) {
      core.humanRecord = livedFor;
      console.log('New human record!', this, livedFor);
    }
  }

  getInput() {
    const zombiesAround = this.getZombiesAround();
    const weaponsAround = this.getWeaponsAround();
    const weaponsInPickupRadius = this.getWeaponsAround(5);

    return {
      zombiesAround: zombiesAround.length > 0,
      weaponsAround: weaponsAround.length > 0,
      weaponInPickupRadius: weaponsInPickupRadius.length > 0,
      haveWeapon: !!this.weapon,
    };
  }
}

export default Human;
