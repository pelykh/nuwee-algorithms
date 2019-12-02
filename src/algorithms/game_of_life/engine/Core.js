import Scene from './Scene';
import Actor from '../modules/Actor';

class Core {
  constructor() {
    this.scene = new Scene('app');
    this.actor = new Actor();
    this.scene.add(this.actor.mesh);

    this.animate = this.animate.bind(this);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.actor.rotate();
    this.scene.update();
  }
}

export default Core;
