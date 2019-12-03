import * as THREE from 'three';

class Actor {
  constructor(props={}) {
    this.mesh = this.getMesh(props.color);
  }

  getMesh(color='#ff0055') {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial( { color } );
    return new THREE.Mesh( geometry, material );
  }

  rotate() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }

  moveTo(x, y) {
    this.mesh.position.x = x;
    this.mesh.position.z = y;
  }
}

export default Actor;
