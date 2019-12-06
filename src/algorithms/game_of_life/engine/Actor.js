import * as THREE from 'three';
import {Vector3} from "three";

class Actor {
  constructor(props = {}) {
    this.mesh = this.getMesh(props.color);
    this.config = props.config;
    this.speed = 1;
    this.layers = [];
    this.updateTimer = 0;
    this.updateTimerCooldown = 0.05;
    this.bornAt = Date.now();
  }

  getMesh(color = '#ff0055') {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({color});
    return new THREE.Mesh(geometry, material);
  }

  teleportTo(x, y) {
    this.mesh.position.x = x;
    this.mesh.position.z = y;
  }

  overlapsWith(actors, radius) {
    return actors.map((actor) => ({
      actor,
      distance: this.mesh.position.distanceTo(actor.mesh.position),
    }))
      .filter((overlap) => overlap.distance < radius)
      .sort((a, b) => a.distance > b.distance);
  }

  getZombiesAround(radius = 50) {
    return this.overlapsWith(this.config.gameState.zombies, radius);
  }

  getWeaponsAround(radius = 50) {
    return this.overlapsWith(this.config.gameState.weapons, radius);
  }

  getHumansAround(radius = 50) {
    return this.overlapsWith(this.config.gameState.humans, radius);
  }

  destroy(actors) {
    const i = actors.indexOf(this);
    actors.splice(i, 1);
    this.config.scene.remove(this.mesh);
  }

  calculateScore(layer, input) {
    const {weight, bias} = layer;
    let score = 0;

    for (const key in layer.weight) {
      score += weight[key] * input[key];
    }

    return score + bias || 0;
  }

  moveTo(actor, runAway = false) {
    const { config, mesh } = this;
    const { position } = mesh;
    const { scene } = config;
    const vector = new Vector3();
    vector.subVectors(actor.mesh.position, position);
    vector.normalize();

    if (runAway) {
      vector.negate();
    }

    const newX = position.x + this.speed * vector.x;
    const newZ = position.z + this.speed * vector.z;

    if (newX > 0 && newX < scene.width) {
      position.x = newX;
    }

    if (newZ > 0 && newZ < scene.height) {
      position.z = newZ;
    }
  }

  moveToPoint(x, z, runAway = false) {
    this.moveTo({
      mesh: {
        position: new Vector3(x, 0, z),
      }
    }, runAway);
  }

  getInput() {
    return {};
  }

  delay(secs) {
    this.updateTimer = this.updateTimerCooldown - secs;
  }

  update(delta) {
    this.updateTimer += delta;

    if (this.updateTimer < this.updateTimerCooldown) {
      return false
    }

    this.updateTimer = 0;
    const input = this.getInput();
    const outputs = this.layers.map((layer) => this.calculateScore(layer, input));
    const i = outputs.indexOf(Math.max(...outputs));

    // console.log(this, outputs);
    this.layers[i].use();
  }
}

export default Actor;
