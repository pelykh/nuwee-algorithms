import * as THREE from 'three';

class Actor {
  constructor(props) {
    this.mesh = this.getMesh();
  }

  getMesh() {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    return new THREE.Mesh( geometry, material );
  }

  rotate() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}

export default Actor;
