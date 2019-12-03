import Actor from '../engine/Actor';

class Weapon extends Actor {
  constructor(props) {
    super({...props, color: '#4f5972'});
  }
}

export default Weapon;
