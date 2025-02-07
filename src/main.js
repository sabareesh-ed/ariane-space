import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AnimationUtils } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import dat from 'dat.gui';

const envStudio = "./assets/ENV_V04_OPTI.hdr";

let camera, scene, renderer, controls;
let mixer;
const clock = new THREE.Clock();
const actions = [];

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

init();
animate();

function init() {
  const canvas = document.querySelector('.webgl');
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(10, 10, 70);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const loader = new GLTFLoader();
  const modelURL = new URL('./assets/OVERVIEW_V06/OVERVIEW_V06.gltf', import.meta.url).href;

  loader.load(
    modelURL,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);
  
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
          console.log(`Made ${child.name} transparent.`);
        }
      });
  

      mixer = new THREE.AnimationMixer(model);
      const originalClip = gltf.animations[0];
      const subClip1 = AnimationUtils.subclip(originalClip, '1', 0, 2050, 30);
      const subClip2 = AnimationUtils.subclip(originalClip, '2', 151, 450, 30);
      const subClip3 = AnimationUtils.subclip(originalClip, '3', 451, 750, 30);
  
      const action1 = mixer.clipAction(subClip1);
      const action2 = mixer.clipAction(subClip2);
      const action3 = mixer.clipAction(subClip3);
  
      actions.push(action1, action2, action3);
  
      console.log('Model and animation loaded! Original Clip:', originalClip);
      createAnimationGUI();
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

  const gui = new dat.GUI();
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(camera.position, 'x', -10, 10).name('Camera X');
  cameraFolder.add(camera.position, 'y', -10, 10).name('Camera Y');
  cameraFolder.add(camera.position, 'z', 1, 50).name('Camera Z');
  cameraFolder.add(camera, 'fov', 10, 75).name('Field of View')
    .onChange(() => camera.updateProjectionMatrix());
  cameraFolder.open();
}

const rgbeLoader = new RGBELoader();
rgbeLoader.load(envStudio, (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
});

function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    console.log('Hovered:', intersectedObject.name);
  }
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
  renderer.render(scene, camera);
}

function createAnimationGUI() {
  const gui = new dat.GUI();
  const animFolder = gui.addFolder('Animations');
  const animationParams = {
    currentAnimation: 'Play 1',
  };

  animFolder.add(animationParams, 'currentAnimation', ['Play 1', 'Play 2', 'Play 3'])
    .name('Choose Animation')
    .onChange((value) => {
      actions.forEach((a) => a.stop());
      if (value === 'Play 1') {
        actions[0].reset().play();
      } else if (value === 'Play 2') {
        actions[1].reset().play();
      } else if (value === 'Play 3') {
        actions[2].reset().play();
      }
    });

  animFolder.add(mixer, 'timeScale', 0, 2).name('Playback Speed');
  animFolder.open();
}
