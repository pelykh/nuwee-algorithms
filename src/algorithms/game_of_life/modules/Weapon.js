import Actor from '../engine/Actor';

class Weapon extends Actor {
  constructor(props) {
    super({...props, color: '#4f5972'});

    this.magazineSize = 2;
  }

  pickup() {
    this.destroy(this.config.gameState.weapons);
  }
}

export default Weapon;
