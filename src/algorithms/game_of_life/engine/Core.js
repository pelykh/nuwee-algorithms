import * as THREE from 'three';
import Scene from './Scene';
import Actor from './Actor';
import Human from '../modules/Human';
import Weapon from '../modules/Weapon';
import Zombie from '../modules/Zombie';
import GameState from './GameState';

class Core {
  constructor() {
    this.scene = new Scene('app');
    this.gameState = new GameState();
    this.clock = new THREE.Clock();

    this.mapWidth = 200;
    this.mapHeight = 200;

    const config = {
      gameState: this.gameState,
    };

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Zombie({config}), x, y, this.gameState.zombies);
    }

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Weapon({config}), x, y, this.gameState.weapons);
    }

    for (let i = 0; i < 1; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Human({config}), x, y, this.gameState.humans);
    }

    this.animate = this.animate.bind(this);
  }

  spawn(actor, x, y, entity) {
    entity.push(actor);
    actor.teleportTo(x, y);
    this.scene.add(actor.mesh);

  }

  animate() {
    const delta = this.clock.getDelta();

    requestAnimationFrame(this.animate);
    this.gameState.zombies.forEach((zombie) => zombie.update(delta));
    this.gameState.humans.forEach((human) => human.update(delta));
    this.scene.update();
  }
}

export default Core;
