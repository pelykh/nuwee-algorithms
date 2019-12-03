import Actor from '../engine/Actor';

class Human extends Actor {
  constructor(props) {
    super({...props, color: '#4ec534'});
  }
}

export default Human;
