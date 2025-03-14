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
const floatModularityBtn = document.querySelector('#float-btn-modularity');
const versatilityBtn = document.querySelector('#versatility');
const floatVersatilityBtn = document.querySelector('#float-btn-versatility');
const booster2Btn = document.querySelector('#booster2');
const booster4Btn = document.querySelector('#booster4');
const loading = document.querySelector('#loading');

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

const hiddenModelChildren = [
  "TXT__single_launch007", "TXT__single_launch008", "TXT__single_launch009", "TXT__single_launch010", 
  "TXT__single_launch011", "TXT__single_launch012", 
  "TXT__single_launch013"
];

const lookAtChildren = [
  "TXT__single_launch", "TXT__single_launch001", "TXT__single_launch002", "TXT__single_launch003", 
  "TXT__single_launch004", "TXT__single_launch005", "TXT__single_launch006"
];

init();

let model = null; 
let isModelLoaded = false;
let showLabels = false;
let modelRotateState = true;
let arianeMain = null;  

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
    "https://tangerine-nougat-dac824.netlify.app/OVERVIEW_V06/OVERVIEW_V06.gltf",
    import.meta.url
  ).href;

  loader.load(
    modelURL,
    (gltf) => {
      model = gltf.scene;
      scene.add(model);
      isModelLoaded = true; 

      if (isModelLoaded) loading.style.display = 'none'; // isModelLoaded 

      const visibilityFolder = gui.addFolder('Visibility Controls');

      model.traverse((child) => {
        if (child.name && hiddenModelChildren.includes(child.name)) {
          child.visible = false;
          visibilityFolder.add(child, 'visible').name(child.name);
        }
      
        if (child.name === "TRUN_MAIN") {
          arianeMain = child;
        }
      
        if (child.isMesh && (
          child.name === "___CHARGE_001" ||
          child.name === "___CHARGE_002" ||
          child.name === "___CHARGE_003" ||
          child.name === "___CHARGE_004" ||
          child.name === "___CHARGE_005" ||
          child.name === "___CHARGE_006" ||
          child.name === "___CHARGE_007"
        )) {
          child.material.transparent = true;
          child.material.opacity = 0;
          console.log("opacity0", child.name)
        }

        if (child.name && lookAtChildren.includes(child.name)) {
          // child.rotation.x = -1.5;
          // child.rotation.y = 0;
          // child.rotation.z = 1.5;  
        }
      });

      visibilityFolder.open();

      function rotateModel() {
        if (arianeMain && modelRotateState === true) {
          arianeMain.rotation.y -= 0.0009;
          // console.log("rotation", arianeMain.rotation.y)
        }
        if (modelRotateState !== false) { 
          requestAnimationFrame(rotateModel);
        }
      }
      

      function stopModelRotation() {
        if (arianeMain && modelRotateState !== false) {
          arianeMain.rotation.y = 0;
        }
        modelRotateState = false;
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

      const booster4to2 = AnimationUtils.subclip(originalClip, "Clip2", 365, 550, 30);
      const actionBooster4to2 = mixer.clipAction(booster4to2);
      actionBooster4to2.loop = THREE.LoopOnce;
      actionBooster4to2.clampWhenFinished = true;

      const booster2to4 = AnimationUtils.subclip(originalClip, "Clip3", 365, 550, 30);
      const actionBooster2to4 = mixer.clipAction(booster2to4);
      actionBooster2to4.loop = THREE.LoopOnce;
      actionBooster2to4.clampWhenFinished = true;

      const versatility = AnimationUtils.subclip(originalClip, "Clip4", 895, 2400, 30);
      const actionVersatility = mixer.clipAction(versatility);
      actionVersatility.loop = THREE.LoopOnce;
      actionVersatility.clampWhenFinished = true;

      actions.push(actionOpenRocket, actionBooster4to2, actionBooster2to4, actionVersatility);

      // createAnimationGUI(booster4to2);

      //event listeners
      overviewBtn.addEventListener('click', () => {
        doOpenRocket();
      })
      
      modularityBtn.addEventListener('click', () => {
        doBooster4to2();
      })

      floatModularityBtn.addEventListener('click', () => {
        modularityBtn.click();
      });

      floatVersatilityBtn.addEventListener('click', () => {
        versatilityBtn.click();
      });

      versatilityBtn.addEventListener('click', () => {
        doVersatility();
        // stopModelRotation();
      })

      booster2Btn.addEventListener('click', () => {
        doBooster4to2();
      }) 
      
      booster4Btn.addEventListener('click', () => {
        doBooster2to4();

      })

      function doOpenRocket() { 
        actions.forEach((action) => action.stop());
        controls.target.set(3, -9, 17);
        model.position.set(3, -26, 17);
        model.scale.set(1.7, 1.7, 1.7);
        model.rotation.set(0, 0, 0);
        modelRotateState = true;
        showLabels = false;

        document.querySelectorAll('.floating-button-wrap').forEach((el) => {
          el.style.display = 'flex';
        })
        
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
        controls.target.set(3, -9, 30);
        const action = actions[1];
        action.reset();
        modelRotateState = true;
        showLabels = false;
        
        action.timeScale = -3;
        action.time = booster4to2.duration;
        model.position.set(6, 0, 45);
        model.rotation.y += 0.01;
        model.scale.set(1.7, 1.7, 1.7);
        model.rotation.x = -1.5;
        camera.position.set(10, 10, 70);

        document.querySelectorAll('.floating-button-wrap').forEach((el) => {
          el.style.display = 'none';
        })

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
        // controls.target.set(7, 4, 30);
        model.position.set(6, 0, 45);
        model.rotation.x = -1.5;
        model.scale.set(1.7, 1.7, 1.7);
        camera.position.set(10, 10, 70);
        modelRotateState = true;
        showLabels = false;
  
        model.traverse((child) => {
          if (child.name && child.name.startsWith("TXT__")) {
            child.visible = false;
          }
        });

        document.querySelectorAll('.floating-button-wrap').forEach((el) => {
          el.style.display = 'none';
        })

        actions[2].play();
        actions[2].timeScale = 3;

        isClickable = false;
      }

      function simulateClickOnCharge(targetObjectName) {
        if (!model) return;
      
        const clickedObject = model.getObjectByName(targetObjectName);
        if (!clickedObject) return;
      
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
        controls.target.set(3, -9, 17); //
        camera.position.set(10, 10, 70);
        
        modelRotateState = true;
        showLabels = true;
        
        model.traverse((child) => {
            if (child.name && child.name.startsWith("TXT__")) {
                child.visible = true;
            }
        });

        document.querySelectorAll('.floating-button-wrap').forEach((el) => {
          el.style.display = 'none';
        })

        console.log('Camera Position:', camera.position);
    
        isClickable = true;

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

        setTimeout(() => {
            simulateClickOnCharge(chargeNames[5]);
        }, 800);
    
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
      animate();     
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

// function createAnimationGUI(booster4to2) {
//   const animFolder = gui.addFolder("Animations");

//   const animationControls = {
//     playAnimation1: function () {
//       actions.forEach((action) => action.stop());
//       controls.target.set(3, -9, 17);
//       model.position.set(3, -26, 17);
//       model.scale.set(1.7, 1.7, 1.7);
//       model.rotation.set(0, 0, 0);
      
//       model.traverse((child) => {
//         if (child.name && child.name.startsWith("TXT__")) {
//           child.visible = false;
//         }
//       });
//       actions[0].reset().play();
//     },
//     playAnimation2: function () {
//       actions.forEach((a) => a.stop());
//       const action = actions[1];
//       action.reset();
//       action.timeScale = -1;
//       action.time = booster4to2.duration;
//       model.position.set(7, 4, 48);
//       model.rotation.y += 0.01;
//       model.scale.set(1.7, 1.7, 1.7);
//       model.rotation.x = -1.5;
//       camera.position.set(10, 10, 70);

//       model.traverse((child) => {
//         if (child.name && child.name.startsWith("TXT__")) {
//           child.visible = false;
//         }
//       });
//       action.play();
//     },
//     playAnimation3: function () {
//       actions.forEach((a) => a.stop());
//       model.position.set(7, 4, 48);
//       model.rotation.x = -1.5;
//       model.scale.set(1.7, 1.7, 1.7);
//       camera.position.set(10, 10, 70);

//       model.traverse((child) => {
//         if (child.name && child.name.startsWith("TXT__")) {
//           child.visible = false;
//         }
//       });
//       actions[2].play();
//     },
//     playAnimation4: function () {
//       actions.forEach((a) => a.stop());
//       model.position.set(3, -42, 17);
//       model.scale.set(2.4, 2.4, 2.4);
//       model.rotation.set(0, 0, 0);
      
//       model.traverse((child) => {
//         if (child.name && child.name.startsWith("TXT__")) {
//           child.visible = true;
//         }
//       });

//       model.traverse((child) => {
//         if (child.name && hiddenModelChildren.includes(child.name)) {
//           child.visible = false;
//         }
//     });
//     },
//   };

//   animFolder.add(animationControls, "playAnimation1").name("openRocket");
//   animFolder.add(animationControls, "playAnimation2").name("actionBooster4to2");
//   animFolder.add(animationControls, "playAnimation3").name("actionBooster2to4");
//   animFolder.add(animationControls, "playAnimation4").name("actionVersatility");
//   animFolder.open();
// }

function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(model ? model.children : [], true);

  if (intersects.length > 0) {
    const hoveredObject = intersects[0].object;
  }
  // else {
  //   model.children.forEach(child => child.scale.set(1, 1, 1));
  // }
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

function updateFloatingButtonPosition1() {
  const chargeObject = model.getObjectByName("CHARGE_UTILE_SYLDA_1");
  
  if (chargeObject) {
    const screenPosition = chargeObject.getWorldPosition(new THREE.Vector3());
    screenPosition.project(camera);

    const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
    const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;

    const floatingButton = document.querySelector("#floating-button-1");

    floatingButton.style.position = 'absolute';
    floatingButton.style.left = `${x-20}px`;
    floatingButton.style.top = `${y-20}px`;
  }
}

function updateFloatingButtonPosition2() {
  const chargeObject = model.getObjectByName("RESERVOIR_PROPERGOL__0001");
  
  if (chargeObject) {
    const screenPosition = chargeObject.getWorldPosition(new THREE.Vector3());
    screenPosition.project(camera);

    const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
    const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;

    const floatingButton = document.querySelector("#floating-button-2");

    floatingButton.style.position = 'absolute';
    floatingButton.style.left = `${x}px`;
    floatingButton.style.top = `${y}px`;
  }
} 


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function adjustForMobile() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    if (model) {
      model.scale.set(1, 1, 1);
    }

    camera.fov = 50;
    camera.updateProjectionMatrix();
  } 
}

window.addEventListener('resize', adjustForMobile);
adjustForMobile();


function animate() {
  if (!isModelLoaded) return;
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  updateFloatingButtonPosition1();
  updateFloatingButtonPosition2();

  const modelQuaternion = new THREE.Quaternion();
  const cameraQuaternion = new THREE.Quaternion();
  const relativeQuaternion = new THREE.Quaternion();
  const relativeEuler = new THREE.Euler();

  const { radToDeg } = THREE.MathUtils;
  const modelNamesSet = new Set([...lookAtChildren, ...hiddenModelChildren]);


  if (showLabels) {
    model.traverse((child) => {
      if (child.name && modelNamesSet.has(child.name)) {
        arianeMain.getWorldQuaternion(modelQuaternion);
        camera.getWorldQuaternion(cameraQuaternion);
  
        modelQuaternion.invert();  
        relativeQuaternion.multiplyQuaternions(modelQuaternion, cameraQuaternion);
  
        relativeEuler.setFromQuaternion(relativeQuaternion, 'YXZ');
        const relativeAngle = radToDeg(relativeEuler.y);
  
        if (relativeAngle > -55 && relativeAngle < 125) {
          if (lookAtChildren.includes(child.name)) {  
            child.visible = true;
          }
          if (hiddenModelChildren.includes(child.name)) {
            child.visible = false;
          }
        } else {
          if (lookAtChildren.includes(child.name)) {
            child.visible = false;
          }
          if (hiddenModelChildren.includes(child.name)) {
            child.visible = true;
          }
        }
      }
    });
  } else {
    model.traverse((child) => {
      if (lookAtChildren.includes(child.name)) {  
        child.visible = false;
      }
      if (hiddenModelChildren.includes(child.name)) {
        child.visible = false;
      }
    });
  }

  if (mixer) mixer.update(delta);
  controls.update();
  renderer.clear();
  renderer.render(backgroundScene, backgroundCamera);
  renderer.clearDepth();
  renderer.render(scene, camera);
}