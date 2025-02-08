import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AnimationUtils } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import dat from 'dat.gui';

const envStudio = "https://cdn.jsdelivr.net/gh/sabareesh-ed/ariane-space@main/src/assets/ENV_V04_OPTI.hdr";
const bgImage = "https://cdn.prod.website-files.com/67a33bcb238c1c5385fe39a5/67a6fbc6657047da472db12b_FOND_V13.jpg";

let camera, scene, renderer, controls;
let mixer;
let backgroundScene, backgroundCamera;
const clock = new THREE.Clock();
const actions = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const gui = new dat.GUI();

init();
animate();

function init() {
  const canvas = document.querySelector('.webgl');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.autoClear = false;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(10, 10, 70);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  backgroundScene = new THREE.Scene();
  backgroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  backgroundScene.add(backgroundCamera);

  const bgLoader = new THREE.TextureLoader();
  bgLoader.load(bgImage, (texture) => {
    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.4 
    });
    const quad = new THREE.Mesh(geo, mat);
    backgroundScene.add(quad);
  });

  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(envStudio, (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdrTexture;
  });

  // GLTF loading
  const loader = new GLTFLoader();
  const modelURL = new URL('./assets/OVERVIEW_V06/OVERVIEW_V06.gltf', import.meta.url).href;
  loader.load(
    modelURL,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      model.position.set(3, -5, 17);
      model.scale.set(1.2, 1.2, 1.2);

      model.traverse((child) => {
        if (
          child.isMesh &&
          (child.name === '___CHARGE_001' ||
           child.name === '___CHARGE_002' ||
           child.name === '___CHARGE_003' ||
           child.name === '___CHARGE_004' ||
           child.name === '___CHARGE_005' ||
           child.name === '___CHARGE_006' ||
           child.name === '___CHARGE_007')
        ) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });

      // Set up animation clips
      mixer = new THREE.AnimationMixer(model);
      const originalClip = gltf.animations[0];
      const subClip1 = AnimationUtils.subclip(originalClip, 'Clip1', 0, 2050, 30);

      const action1 = mixer.clipAction(subClip1);

      actions.push(action1);

      createAnimationGUI();

      const modelFolder = gui.addFolder('Model');
      modelFolder.add(model.position, 'x', -50, 50).name('Position X');
      modelFolder.add(model.position, 'y', -50, 50).name('Position Y');
      modelFolder.add(model.position, 'z', -50, 50).name('Position Z');

      modelFolder.add(model.rotation, 'x', -Math.PI, Math.PI).name('Rotation X');
      modelFolder.add(model.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
      modelFolder.add(model.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z');

      modelFolder.add(model.scale, 'x', 0.1, 5).name('Scale X');
      modelFolder.add(model.scale, 'y', 0.1, 5).name('Scale Y');
      modelFolder.add(model.scale, 'z', 0.1, 5).name('Scale Z');
      modelFolder.open();

    },
    (xhr) => {
      console.log(`Model ${((xhr.loaded / xhr.total) * 100).toFixed(2)}% loaded`);
    },
    (error) => {
      console.error('An error occurred while loading the GLTF model:', error);
    }
  );

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('pointermove', onPointerMove);

  // Camera GUI
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(camera.position, 'x', -10, 10).name('Camera X');
  cameraFolder.add(camera.position, 'y', -10, 10).name('Camera Y');
  cameraFolder.add(camera.position, 'z', 1, 100).name('Camera Z');
  cameraFolder
    .add(camera, 'fov', 10, 75)
    .name('Field of View')
    .onChange(() => camera.updateProjectionMatrix());
  cameraFolder.open();
}

function createAnimationGUI() {
  const animFolder = gui.addFolder('Animations');
  const animationParams = { currentAnimation: 'Play 1' };

  animFolder
    .add(animationParams, 'currentAnimation', ['Play 1', 'Play 2'])
    .name('Choose Animation')
    .onChange((value) => {
      actions.forEach((a) => a.stop());
      if (value === 'Play 1') actions[0].reset().play();
      // else if (value === 'Play 2') actions[1].reset().play();
      // else if (value === 'Play 3') actions[2].reset().play();
    });

  animFolder.add(mixer, 'timeScale', 0, 2).name('Playback Speed');
  animFolder.open();
}

function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.intersectObjects(scene.children, true);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  controls.update();

  // Render background first
  renderer.clear();
  renderer.render(backgroundScene, backgroundCamera);

  // Then render main scene
  renderer.clearDepth(); 
  renderer.render(scene, camera);
}

export function playClip1() {
  actions.forEach((a) => a.stop());
  actions[0].reset().play();
}
export function playClip2() {
  actions.forEach((a) => a.stop());
  actions[1].reset().play();
}
export function playClip3() {
  actions.forEach((a) => a.stop());
  actions[2].reset().play();
}
