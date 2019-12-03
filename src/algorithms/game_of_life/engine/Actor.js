import * as THREE from 'three';

class Actor {
  constructor(props = {}) {
    this.mesh = this.getMesh(props.color);
    this.config = props.config;

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
    })).filter((overlap) => overlap.distance < radius);
  }

  update(delta) {
  }
}

export default Actor;
