import * as THREE from 'three';
import { MapControls} from '../../../lib/OrbitControls';

class Scene {
  constructor(id, width, height) {
    this.width = width || 200;
    this.height = height || 200;
    this.root = document.getElementById(id);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('#4e8ee0', 1);

    this.root.appendChild(this.renderer.domElement);
    this.camera.position.set(10, 10, 0);

    this.controls = new MapControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.initializeLight();

    this.initializeEnvironment(width, height);
  }

  initializeEnvironment(width, height) {
    const geometry = new THREE.BoxGeometry( width, 1, height);
    const material = new THREE.LineBasicMaterial( { color: '#b5b5b5' } );
    const ground = new THREE.Mesh( geometry, material );
    ground.position.set(width / 2, -2, height / 2);

    this.add(ground);
  }

  initializeLight() {
    const dl = new THREE.DirectionalLight('#ffffff', 0.6);
    const mainLight = new THREE.AmbientLight('#ffffff', 0.5);

    this.add(dl);
    this.add(mainLight);
  }

  add(mesh) {
    this.scene.add(mesh);
  }

  remove(mesh) {
    this.scene.remove(mesh);
  }

  update() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Scene;
