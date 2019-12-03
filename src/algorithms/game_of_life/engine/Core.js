import Scene from './Scene';
import Actor from './Actor';
import Human from '../modules/Human';
import Weapon from '../modules/Weapon';
import Zombie from '../modules/Zombie';

class Core {
  constructor() {
    this.scene = new Scene('app');

    this.mapWidth = 200;
    this.mapHeight = 200;

    this.zombies = [];
    this.humans = [];
    this.weapons = [];

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Zombie(), x, y, this.zombies);
    }

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Weapon(), x, y, this.weapons);
    }

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Human(), x, y, this.humans);
    }

    this.animate = this.animate.bind(this);
  }

  spawn(actor, x, y, entity) {
    entity.push(actor);
    actor.moveTo(x, y);
    this.scene.add(actor.mesh);

  }

  animate() {
    requestAnimationFrame(this.animate);
    this.scene.update();
  }
}

export default Core;
