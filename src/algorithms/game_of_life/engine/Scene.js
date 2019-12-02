import * as THREE from "three";

class Scene {
  constructor(id) {
    this.root = document.getElementById(id);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.root.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;
  }

  add(mesh) {
    this.scene.add(mesh);
  }

  remove(mesh) {
    this.scene.remove(mesh);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Scene;
