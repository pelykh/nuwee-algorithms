import * as THREE from 'three';
import Scene from './Scene';
import Actor from './Actor';
import Human from '../modules/Human';
import Weapon from '../modules/Weapon';
import Zombie from '../modules/Zombie';
import GameState from './GameState';

class Core {
  constructor() {
    this.mapWidth = 200;
    this.mapHeight = 200;
    this.scene = new Scene('app', this.mapWidth, this.mapHeight);
    this.gameState = new GameState();
    this.clock = new THREE.Clock();

    this.humanRecord = 0;
    this.zombieRecord = 0;

    const config = {
      gameState: this.gameState,
      scene: this.scene,
      core: this,
    };

    // this.spawn(new Weapon({config}), 10, 10, this.gameState.weapons);
    // this.spawn(new Zombie({config}), 0, 10, this.gameState.zombies);
    // this.spawn(new Human({config}), 0, 0, this.gameState.humans);

    for (let i = 0; i < 20; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Zombie({config}), x, y, this.gameState.zombies);
    }

    for (let i = 0; i < 20; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Weapon({config}), x, y, this.gameState.weapons);
    }

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.mapWidth;
      const y = Math.random() * this.mapHeight;
      this.spawn(new Human({config}), x, y, this.gameState.humans);
    }

    setInterval(() => {
      if(this.gameState.humans.length < 10) {
        const x = Math.random() * this.mapWidth;
        const y = Math.random() * this.mapHeight;
        this.spawn(new Human({config}), x, y, this.gameState.humans);
      }

      if(this.gameState.weapons.length < 50) {
        const x = Math.random() * this.mapWidth;
        const y = Math.random() * this.mapHeight;
        this.spawn(new Weapon({config}), x, y, this.gameState.weapons);
      }

      if(this.gameState.zombies.length < 10) {
        const x = Math.random() * this.mapWidth;
        const y = Math.random() * this.mapHeight;
        this.spawn(new Zombie({config}), x, y, this.gameState.zombies);
      }
    }, 100);

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
