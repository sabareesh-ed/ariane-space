import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AnimationUtils } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import dat from 'dat.gui';
import gsap from 'gsap';

const envStudio =
  "https://cdn.jsdelivr.net/gh/sabareesh-ed/ariane-space@main/src/assets/ENV_V04_OPTI.hdr";
const bgImage =
  "https://cdn.prod.website-files.com/67a33bcb238c1c5385fe39a5/67a6fbc6657047da472db12b_FOND_V13.jpg";

let camera, scene, renderer, controls;
let mixer;
let backgroundScene, backgroundCamera;
const clock = new THREE.Clock();
const actions = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let isClickable = false;

const overviewBtn = document.querySelector('#overview');
const modularityBtn = document.querySelector('#modularity');
const versatilityBtn = document.querySelector('#versatility');
const booster2Btn = document.querySelector('#booster2');
const booster4Btn = document.querySelector('#booster4');

const gui = new dat.GUI();

const frameMapping = {
  "___CHARGE_001": 895, 
  "___CHARGE_002": 1050,
  "___CHARGE_003": 1200,
  "___CHARGE_004": 1350,
  "___CHARGE_005": 1500,
  "___CHARGE_006": 1650,
  "___CHARGE_007": 1800,
};

init();
animate();

let model;

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
  controls.target.set(3, -9, 17);

  controls.enablePan = false;
  controls.touches.TWO = THREE.TOUCH.NONE;
  controls.enableZoom = false;
  
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
      opacity: 0.4,
    });
    const quad = new THREE.Mesh(geo, mat);
    backgroundScene.add(quad);
  });

  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(envStudio, (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdrTexture;
  });

  const loader = new GLTFLoader();
  const modelURL = new URL(
    "./assets/OVERVIEW_V06/OVERVIEW_V06.gltf",
    import.meta.url
  ).href;

  let arianeMain = null;
  loader.load(
    modelURL,
    (gltf) => {
      model = gltf.scene;
      scene.add(model);

      model.traverse((child) => {
        console.log(child.name);

        if (child.name === "TRUN_MAIN") {
          arianeMain = child;
        }

        if (
          child.isMesh &&
          (child.name === "___CHARGE_001" ||
            child.name === "___CHARGE_002" ||
            child.name === "___CHARGE_003" ||
            child.name === "___CHARGE_004" ||
            child.name === "___CHARGE_005" ||
            child.name === "___CHARGE_006" ||
            child.name === "___CHARGE_007")
        ) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });

      function rotateModel() {
        if (arianeMain) {
          arianeMain.rotation.y -= 0.0007;
        }
        requestAnimationFrame(rotateModel);
      }
      rotateModel();

      model.position.set(3, -26, 17);
      model.scale.set(1.7, 1.7, 1.7);

      mixer = new THREE.AnimationMixer(model); 
      const originalClip = gltf.animations[0];

      const openRocket = AnimationUtils.subclip(originalClip, "openRocket", 0, 240, 30);
      const actionOpenRocket = mixer.clipAction(openRocket);
      actionOpenRocket.clampWhenFinished = true;
      actionOpenRocket.loop = THREE.LoopOnce;

      const booster4to2 = AnimationUtils.subclip(originalClip, "Clip2", 360, 550, 30);
      const actionBooster4to2 = mixer.clipAction(booster4to2);
      actionBooster4to2.loop = THREE.LoopOnce;
      actionBooster4to2.clampWhenFinished = true;

      const booster2to4 = AnimationUtils.subclip(originalClip, "Clip3", 360, 550, 30);
      const actionBooster2to4 = mixer.clipAction(booster2to4);
      actionBooster2to4.loop = THREE.LoopOnce;
      actionBooster2to4.clampWhenFinished = true;

      const versatility = AnimationUtils.subclip(originalClip, "Clip4", 895, 2400, 30);
      const actionVersatility = mixer.clipAction(versatility);
      actionVersatility.loop = THREE.LoopOnce;
      actionVersatility.clampWhenFinished = true;

      actions.push(actionOpenRocket, actionBooster4to2, actionBooster2to4, actionVersatility);

      createAnimationGUI(booster4to2);

      //event listeners
      overviewBtn.addEventListener('click', () => {
        doOpenRocket();
      })
      
      modularityBtn.addEventListener('click', () => {
        doBooster4to2();
      })
      
      versatilityBtn.addEventListener('click', () => {
        doVersatility();
      })
      
      booster2Btn.addEventListener('click', () => {
        doBooster4to2();
      }) 
      
      booster4Btn.addEventListener('click', () => {
        doBooster2to4();
      })

      // all functions
      function doOpenRocket() { 
        actions.forEach((action) => action.stop());
        controls.target.set(3, -9, 17);
        model.position.set(3, -26, 17);
        model.scale.set(1.7, 1.7, 1.7);
        model.rotation.set(0, 0, 0);
        
        model.traverse((child) => {
          if (child.name && child.name.startsWith("TXT__")) {
            child.visible = false;
          }
        });
      actions[0].reset().play();

      isClickable = false;
      }

      doOpenRocket();

      function doBooster4to2() {
        actions.forEach((a) => a.stop());
        const action = actions[1];
        action.reset();
        action.timeScale = -1;
        action.time = booster4to2.duration;
        model.position.set(7, 4, 48);
        model.rotation.y += 0.01;
        model.scale.set(1.7, 1.7, 1.7);
        model.rotation.x = -1.5;
        camera.position.set(10, 10, 70);

        model.traverse((child) => {
          if (child.name && child.name.startsWith("TXT__")) {
            child.visible = false;
          }
        });

        isClickable = false;
        action.play();
      }
      
      function doBooster2to4() {
        actions.forEach((a) => a.stop());
        model.position.set(7, 4, 48);
        model.rotation.x = -1.5;
        model.scale.set(1.7, 1.7, 1.7);
        camera.position.set(10, 10, 70);
  
        model.traverse((child) => {
          if (child.name && child.name.startsWith("TXT__")) {
            child.visible = false;
          }
        });
        actions[2].play();

        isClickable = false;
      }

      function simulateClickOnCharge(targetObjectName) {
        
        // Ensure that the object exists
        if (!model) return;
      
        const clickedObject = model.getObjectByName(targetObjectName);
        if (!clickedObject) return; // Object not found, exit
      
        const targetFrame = frameMapping[clickedObject.name];
      
        if (targetFrame !== undefined) {
          const clipStartFrame = 895;
          const fps = 30;
          const targetTime = (targetFrame - clipStartFrame) / fps;
      
          actions.forEach((action, idx) => {
            if (idx !== 3) {
              action.stop();
            }
          });
      
          const versatilityAction = actions[3];
      
          if (lastTargetTime === null) {
            versatilityAction.reset();
            versatilityAction.play();
            versatilityAction.paused = false;
            lastTargetTime = 0; 
          } else {
            versatilityAction.play();
            versatilityAction.paused = false;
          }
      
          gsap.to(versatilityAction, {
            time: targetTime,
            duration: Math.abs(targetTime - versatilityAction.time) * 0.2,
            ease: 'power1.inOut',
            onComplete: () => {
              versatilityAction.paused = true;
              lastTargetTime = targetTime;
            },
          });
        }
      }


      function doVersatility() {
        actions.forEach((a) => a.stop());
        model.position.set(3, -42, 17);
        model.scale.set(2.4, 2.4, 2.4);
        model.rotation.set(0, 0, 0);
        
        model.traverse((child) => {
            if (child.name && child.name.startsWith("TXT__")) {
                child.visible = true;
            }
        });
    
        isClickable = true;
    
        // Set up a function to simulate clicks on all charges at intervals
        const chargeNames = [
            "___CHARGE_001",
            "___CHARGE_002",
            "___CHARGE_003",
            "___CHARGE_004",
            "___CHARGE_005",
            "___CHARGE_006",
            "___CHARGE_007"
        ];
    
        let currentChargeIndex = 0;
        
        // Start the click simulation immediately
        simulateClickOnCharge(chargeNames[currentChargeIndex]);
    
        // Set interval to continue simulating clicks every 2.5 seconds
        const chargeInterval = setInterval(() => {
            currentChargeIndex++;
    
            if (currentChargeIndex < chargeNames.length) {
                simulateClickOnCharge(chargeNames[currentChargeIndex]);
            } else {
                clearInterval(chargeInterval);
            }
        }, 3000);
    
        const originalOnClick = onClick;
        onClick = function(event) {
            originalOnClick(event);
    
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                const targetFrame = frameMapping[clickedObject.name];
                if (targetFrame !== undefined) {
                    clearInterval(chargeInterval);
                }
            }
        };
    }
    
      



      // Add model controls to the dat.GUI
      const modelFolder = gui.addFolder("Model");
      modelFolder.add(model.position, "x", -70, 70).name("Position X");
      modelFolder.add(model.position, "y", -70, 70).name("Position Y");
      modelFolder.add(model.position, "z", -70, 70).name("Position Z");
      modelFolder.add(model.rotation, "x", -Math.PI, Math.PI).name("Rotation X");
      modelFolder.add(model.rotation, "y", -Math.PI, Math.PI).name("Rotation Y");
      modelFolder.add(model.rotation, "z", -Math.PI, Math.PI).name("Rotation Z");
      modelFolder.add(model.scale, "x", 0.1, 5).name("Scale X");
      modelFolder.add(model.scale, "y", 0.1, 5).name("Scale Y");
      modelFolder.add(model.scale, "z", 0.1, 5).name("Scale Z");
      modelFolder.open();
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error("An error occurred while loading the GLTF model:", error);
    }
  );

  window.addEventListener("resize", onWindowResize);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("click", onClick, false);

  // Set up camera controls in the GUI
  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(camera.position, "x", -10, 10).name("Camera X");
  cameraFolder.add(camera.position, "y", -10, 10).name("Camera Y");
  cameraFolder.add(camera.position, "z", 0, 1, 100).name("Camera Z");
  cameraFolder
    .add(camera, "fov", 10, 75)
    .name("Field of View")
    .onChange(() => camera.updateProjectionMatrix());
  cameraFolder.open();
}

function createAnimationGUI(booster4to2) {
  const animFolder = gui.addFolder("Animations");

  const animationControls = {
    playAnimation1: function () {
      actions.forEach((action) => action.stop());
      controls.target.set(3, -9, 17);
      model.position.set(3, -26, 17);
      model.scale.set(1.7, 1.7, 1.7);
      model.rotation.set(0, 0, 0);
      
      model.traverse((child) => {
        if (child.name && child.name.startsWith("TXT__")) {
          child.visible = false;
        }
      });
      actions[0].reset().play();
    },
    playAnimation2: function () {
      actions.forEach((a) => a.stop());
      const action = actions[1];
      action.reset();
      action.timeScale = -1;
      action.time = booster4to2.duration;
      model.position.set(7, 4, 48);
      model.rotation.y += 0.01;
      model.scale.set(1.7, 1.7, 1.7);
      model.rotation.x = -1.5;
      camera.position.set(10, 10, 70);

      model.traverse((child) => {
        if (child.name && child.name.startsWith("TXT__")) {
          child.visible = false;
        }
      });
      action.play();
    },
    playAnimation3: function () {
      actions.forEach((a) => a.stop());
      model.position.set(7, 4, 48);
      model.rotation.x = -1.5;
      model.scale.set(1.7, 1.7, 1.7);
      camera.position.set(10, 10, 70);

      model.traverse((child) => {
        if (child.name && child.name.startsWith("TXT__")) {
          child.visible = false;
        }
      });
      actions[2].play();
    },
    playAnimation4: function () {
      // Uncomment and modify as needed.
      actions.forEach((a) => a.stop());
      model.position.set(3, -42, 17);
      model.scale.set(2.4, 2.4, 2.4);
      model.rotation.set(0, 0, 0);
      
      model.traverse((child) => {
        if (child.name && child.name.startsWith("TXT__")) {
          child.visible = true;
        }
      });
    },
  };

  animFolder.add(animationControls, "playAnimation1").name("openRocket");
  animFolder.add(animationControls, "playAnimation2").name("actionBooster4to2");
  animFolder.add(animationControls, "playAnimation3").name("actionBooster2to4");
  animFolder.add(animationControls, "playAnimation4").name("actionVersatility");
  animFolder.open();
}

function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.intersectObjects(scene.children, true);
}

let lastTargetTime = null;

function onClick(event) {
  event.preventDefault();

  if (!isClickable) return; 

  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  const pointer = new THREE.Vector2(mouseX, mouseY);

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(model ? model.children : [], true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const targetFrame = frameMapping[clickedObject.name];

    if (targetFrame !== undefined) {
      const clipStartFrame = 895;
      const fps = 30;
      const targetTime = (targetFrame - clipStartFrame) / fps;

      actions.forEach((action, idx) => {
        if (idx !== 3) {
          action.stop();
        }
      });

      const versatilityAction = actions[3];
      
      if (lastTargetTime === null) {
        versatilityAction.reset();
        versatilityAction.play();
        versatilityAction.paused = false;
        lastTargetTime = 0; 
      } else {
        versatilityAction.play();
        versatilityAction.paused = false;
      }

      gsap.to(versatilityAction, {
        time: targetTime,
        duration: Math.abs(targetTime - versatilityAction.time) * 0.2,
        ease: 'power1.inOut',
        onComplete: () => {
          versatilityAction.paused = true;
          lastTargetTime = targetTime;
        },
      });
    }
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
  renderer.clear();
  renderer.render(backgroundScene, backgroundCamera);
  renderer.clearDepth();
  renderer.render(scene, camera);
}