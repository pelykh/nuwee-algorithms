import Actor from '../engine/Actor';

class Zombie extends Actor {
  constructor(props) {
    super({...props, color: '#ff0044'});
  }
}

export default Zombie;
