import Actor from '../engine/Actor';

class Zombie extends Actor {
  constructor(props) {
    super({...props, color: '#ff0044'});

    this.speed = 1;
    this.killStreak = 0;
    this.senseRadius = 55;
    this.attackRange = 3;

    this.layers = [
      {
        use: () => this.goForHuman(),
        bias: -0.5,
        weight: {
          humansAround: 1,
          humansInAttackRange: -1,
        }
      },
      {
        use: () => this.scout(),
        bias: 0.5,
        weight: {
          humansAround: -1,
          humansInAttackRange: -1,
        }
      },
      {
        use: () => this.eatHuman(),
        bias: 0,
        weight: {
          humansAround: 0,
          humansInAttackRange: 1,
        }
      },
    ];
  }

  eatHuman() {
    const humansAround = this.getHumansAround(this.attackRange);
    const closestHuman = humansAround[0]?.actor;

    if (closestHuman) {
      closestHuman.turnIntoAZombie();
      this.killStreak += 1;
    }
  }

  goForHuman() {
    this.speed = 1.2;
    const humansAround = this.getHumansAround(this.senseRadius);
    this.moveTo(humansAround[0]?.actor);
  }

  scout() {
    this.speed = 1;
    this.moveToPoint(100, 100);
  }

  getInput() {
    const humansAround = this.getHumansAround(this.senseRadius);
    const humansInAttackRange = this.getHumansAround(this.attackRange);

    return {
      humansAround: humansAround.length > 0,
      humansInAttackRange: humansInAttackRange.length > 0,
    };
  }

  kill() {
    this.destroy(this.config.gameState.zombies);

    const { core } = this.config;
    const livedFor = Date.now() - this.bornAt;

    if (livedFor > core.zombieRecord) {
      core.zombieRecord = livedFor;
      console.log('New zombie record!', this, livedFor);
    }
  }
}

export default Zombie;
