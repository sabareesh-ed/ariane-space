const _0x15829d = _0x4dbb;
(function (_0x6e7899, _0x4a1fd8) {
  const _0x29f887 = _0x4dbb,
    _0x93682b = _0x6e7899();
  while (!![]) {
    try {
      const _0x48351d =
        -parseInt(_0x29f887(0x24c)) / 0x1 +
        (-parseInt(_0x29f887(0x1e4)) / 0x2) *
          (parseInt(_0x29f887(0x1f2)) / 0x3) +
        parseInt(_0x29f887(0x227)) / 0x4 +
        -parseInt(_0x29f887(0x21f)) / 0x5 +
        parseInt(_0x29f887(0x242)) / 0x6 +
        (parseInt(_0x29f887(0x256)) / 0x7) *
          (parseInt(_0x29f887(0x1d2)) / 0x8) +
        -parseInt(_0x29f887(0x26a)) / 0x9;
      if (_0x48351d === _0x4a1fd8) break;
      else _0x93682b["push"](_0x93682b["shift"]());
    } catch (_0x3ed7d3) {
      _0x93682b["push"](_0x93682b["shift"]());
    }
  }
})(_0x3b43, 0x9f834);
let activMode = "",
  allowRender = !![];
const shadow = ![],
  aliasing = !![],
  AEColor = _0x15829d(0x200),
  scale = 0x3;
let renderer,
  scene,
  camera,
  controls,
  model,
  trajMap,
  stepsObj,
  animationTravBall,
  realTime = !![],
  deltaTime = 0x0,
  f = 0x0,
  perfTime = 0.03,
  currentTime = 0x0,
  targetTime = 0x0,
  paused = ![],
  trajPerc = 0x0,
  startTime = 0x0,
  endTime = 0x5,
  prevTxt = "",
  speed = 0.7,
  turnSpeed = 0.1,
  driveCam = ![],
  target_posX = 0x0,
  target_posY = 0x0,
  target_posZ = 0x0,
  cam_posX = 0x0,
  cam_posY = 0xa,
  cam_posZ = 0x32;
const clock = new THREE["Clock"](),
  configList = [
    _0x15829d(0x209),
    _0x15829d(0x292),
    "Multipel_Launch",
    _0x15829d(0x1ff),
    _0x15829d(0x1eb),
    _0x15829d(0x267),
    _0x15829d(0x28b),
  ],
  configStart = [0x1e, 0x23, 0x28, 0x2d, 0x32, 0x37, 0x3c],
  configEnd = [0x1e, 0x23, 0x28, 0x2d, 0x32, 0x37, 0x3c],
  overviewNameList = [
    _0x15829d(0x211),
    "<span\x20style=\x22color:#fff\x22>Flexibility:</span>\x20capability\x20to\x20perform\x20a\x20multitude\x20of<br>complex\x20missions\x20using\x20its\x20re-ignitable\x20upper\x20stage",
    _0x15829d(0x1cf),
    _0x15829d(0x29a),
  ],
  overviewBtList = [
    _0x15829d(0x236),
    _0x15829d(0x287),
    "OverviewBt3",
    _0x15829d(0x1d7),
  ],
  overviewFnList = [
    _0x15829d(0x2a8),
    _0x15829d(0x24e),
    _0x15829d(0x27f),
    "setUpPerformance()",
  ],
  overviewObjList = [
    _0x15829d(0x293),
    _0x15829d(0x27e),
    "PROPULSEUR_SOLIDE__009",
    _0x15829d(0x270),
  ];
THREE["Cache"][_0x15829d(0x240)] = !![];
function init() {
  const _0x4e10d0 = _0x15829d;
  (document[_0x4e10d0(0x2a3)](_0x4e10d0(0x239))[_0x4e10d0(0x2af)][
    _0x4e10d0(0x204)
  ] = _0x4e10d0(0x22a)),
    (document["getElementById"](_0x4e10d0(0x1de))[_0x4e10d0(0x2af)][
      _0x4e10d0(0x206)
    ] = 0x0),
    clearScreen(),
    create3Dscene(_0x4e10d0(0x1de)),
    loadObjects(_0x4e10d0(0x1e2), _0x4e10d0(0x248));
  var _0x238e70 = document[_0x4e10d0(0x2a3)](_0x4e10d0(0x1d9));
}
init();
function startScene() {
  const _0x59a8f9 = _0x15829d;
  (document[_0x59a8f9(0x2a3)](_0x59a8f9(0x239))[_0x59a8f9(0x2af)][
    _0x59a8f9(0x204)
  ] = _0x59a8f9(0x23a)),
    (document[_0x59a8f9(0x2a3)](_0x59a8f9(0x239))[_0x59a8f9(0x2af)][
      _0x59a8f9(0x206)
    ] = 0x1),
    setCamPos(_0x59a8f9(0x2aa), "Camera001Target", !![]),
    (document[_0x59a8f9(0x2a3)]("DIV_LOADING")[_0x59a8f9(0x259)] = ""),
    setUpMaterial(),
    setUpLights(),
    setUpOverview(),
    model["scale"][_0x59a8f9(0x296)](scale, scale, scale),
    setTimeout(function () {
      animate();
    }, 0x12c),
    setTimeout(function () {
      const _0x1aa38f = _0x59a8f9;
      document[_0x1aa38f(0x2a3)](_0x1aa38f(0x1de))[_0x1aa38f(0x2af)][
        "opacity"
      ] = 0x1;
    }, 0x3e8);
}
function animate() {
  const _0x3f651d = _0x15829d;
  (f = f + 0x1),
    (camera["aspect"] = window[_0x3f651d(0x26c)] / window[_0x3f651d(0x258)]),
    camera["updateProjectionMatrix"](),
    renderer[_0x3f651d(0x1f3)](
      window[_0x3f651d(0x26c)],
      window[_0x3f651d(0x258)]
    ),
    camera["aspect"] < 0x1
      ? (camera[_0x3f651d(0x220)] =
          0x19 / (camera[_0x3f651d(0x1da)] * 0.4 + 0.6))
      : (camera[_0x3f651d(0x220)] = 0x19),
    updateCamPos(),
    requestAnimationFrame(animate),
    allowRender && renderer["render"](scene, camera),
    controls["update"](),
    (deltaTime = clock[_0x3f651d(0x2b4)]()),
    updateAnimation(deltaTime),
    updateLightPos("Lcharge", _0x3f651d(0x293)),
    updateLightPos("Lbooster", _0x3f651d(0x2a0)),
    updateLightPos("Lcoiffe", "LcoiffeTargetPos"),
    updateBtOverviewPosition(),
    (scene[_0x3f651d(0x266)](_0x3f651d(0x1d3))[_0x3f651d(0x25a)]["y"] +=
      perfTime * turnSpeed * 0.1);
}
function _0x3b43() {
  const _0x357311 = [
    "getContext",
    "flexilibity",
    "maxPolarAngle",
    "666853nXvQUr",
    "drag",
    "setUpFlexibility()",
    "load",
    "clipAction",
    "setAttribute",
    "shadow",
    "clientY",
    "touches",
    "onmousedown",
    "368039HXzUTT",
    "domElement",
    "innerHeight",
    "innerHTML",
    "rotation",
    "setPath",
    "autoRotateSpeed",
    "MeshBasicMaterial",
    "SpotLight",
    "screenSpacePanning",
    "shadowMap",
    "setTime",
    "IFRAME1",
    "buttonNBbBooster",
    "attach",
    "ACCEUILTEXTE",
    "getObjectByName",
    "Leo_Small_Constellation",
    "traverse",
    "perfomance",
    "1831158hIBuPS",
    "_div",
    "innerWidth",
    "A\x20FLEXIBLE\x20LAUNCHER",
    "buttonAriane",
    "Ltop",
    "ARIANE_MAIN",
    "radius",
    "___CHARGE_002",
    "setBooster(\x2762\x27)",
    "IFRAME1_DIV",
    "___CHARGE_007",
    "overview",
    "Mesh",
    "maxDistance",
    "Camera003Target",
    "lineWidth",
    "keydown",
    "ARIANE\x2062",
    "enableZoom",
    "ETAGESUPERIEUR",
    "setUpModularity()",
    "userSelect",
    "clearRect",
    "textMedium",
    "frames",
    "appendChild",
    "#888888",
    "focusVignette",
    "OverviewBt2",
    "matrixWorld",
    "castShadow",
    "animations",
    "LEO_large_Constellation",
    "https://www.explore-studio.com/ARIANE_ESPACE/DEV_V02/PERFORMANCE_V01.php",
    "mapSize",
    "backgroundColor",
    "name",
    "btModularity",
    "canvasMain",
    "Dual_Launch",
    "CHAGES_ALL",
    "Scene",
    "setFromMatrixPosition",
    "set",
    "focusText",
    "menuBt64",
    "setCamPos\x20:",
    "<span\x20style=\x22color:#fff\x22>Performance:</span>\x20performance\x20guaranteed\x20by\x20Ariane\x206<br>in\x20its\x20A62/A64\x20configurations\x20for\x20different\x20types\x20of\x20orbit",
    "white",
    "onselectstart",
    "GLTFLoader",
    "play",
    "Choose\x20a\x20launcher\x20configuration:",
    "MOTEUR_VULCAIN__LIGHT",
    "btMainMenu",
    "src",
    "getElementById",
    "Ariane\u00a06\x20is\x20a\x20modular,\x20flexible\x20and\x20versatile\x20launcher,\x20enabling\x20Arianespace\x20to\x20respond\x20effectively\x20to\x20customer\x20expectations\x20by\x20offering\x20a\x20broad\x20mission\x20spectrum,\x20driven\x20by\x20advanced\x20technical\x20capabilities\x20and\x20enhanced\x20performance.",
    "4\x20BOOSTERS",
    "Lcharge",
    "Equipped\x20with\x20a\x20Vinci\x20engine\x20capable\x20of\x20up\x20to\x20three\x20re-ignitions,\x20Ariane\x206\x20optimizes\x20orbital\x20paths\x20and\x20maximizes\x20the\x20efficiency\x20of\x20each\x20mission\x20by\x20placing\x20multiple\x20payloads\x20in\x20different\x20orbits\x20in\x20a\x20single\x20flight.<br><br>Its\x20liquid\x20propulsion\x20module\x20enables\x20it\x20to\x20adjust\x20and\x20control\x20its\x20acceleration\x20with\x20extreme\x20precision,\x20right\x20up\x20to\x20inserting\x20satellites\x20into\x20their\x20mission\x20orbit.<br><br>Ariane\x206\x20meets\x20the\x20extensive\x20range\x20of\x20needs\x20of\x20individual\x20satellite\x20launches,\x20constellations\x20and\x20complex\x20missions\x20requiring\x20multiple\x20orbit\x20insertions.",
    "setUpVersatility()",
    "left",
    "Camera001",
    "environment",
    "0px",
    "Two\x20configurations\x20Ariane\x2062\x20/\x20Ariane\x2064\x20for\x20different\x20types\x20of\x20missions.",
    "clientX",
    "style",
    "none",
    "AdditiveBlending",
    "Raycaster",
    "AnimationMixer",
    "getDelta",
    "key",
    "_CHARGE_SCIENCE",
    "updateMatrixWorld",
    "<span\x20style=\x22color:#fff\x22>Modularity:</span>\x20A62/A64\x20launcher\x20configurations<br>for\x20different\x20types\x20of\x20mission",
    "Camera002Target",
    "2\x20BOOSTERS",
    "48DcfvfF",
    "TRUN_MAIN",
    "Large\x20GTO\x20satellites\x20in\x20dual\x20launch\x20configurations<br><br>Large\x20institutional\x20and\x20scientific\x20spacecraft\x20missions<br><br>Deployment\x20of\x20mega-constellations\x20with\x20upper\x20stage\x20re-ignition<br><br>Multi-Launch\x20Service\x20for\x20small\x20satellites\x20(MLS)\x20in\x20piggyback\x20or\x20rideshare\x20configurations<br><br>Delivery\x20of\x20payloads\x20to\x20multiple\x20orbits\x20with\x20the\x20same\x20launch",
    "divTxtDetail",
    "log",
    "OverviewBt4",
    "getBoundingClientRect",
    "DIV_ACCEUILCONTAINER",
    "aspect",
    "touch",
    "mainBt",
    "ARIANE\x2064",
    "DIV_THREEJS_3D",
    "ACCEUILTITRE",
    "zIndex",
    "add",
    "RESSOURCES/",
    "Vector2",
    "63904hWRcOO",
    "height",
    "minDistance",
    "paddingTop",
    "object",
    "_CHARGE_SMALL_CONST",
    "mapping",
    "Dual_Launch_Short_Fairing",
    "frameT",
    "divTxtNbBoosters",
    "end",
    "RGBELoader",
    "___CHARGE_003",
    "TXT__",
    "15PgoCcb",
    "setSize",
    "Lcoiffe",
    "lineTo",
    "A\x20VERSATILE\x20LAUNCHER",
    "btMainMenuOn",
    "isMesh",
    "getWorldPosition",
    "blending",
    "listenToKeyEvents",
    "setPixelRatio",
    "createElement",
    "penumbra",
    "Large_Scientific_Satelite",
    "#6DA5E1",
    "modularity",
    "_CHARGE_DOUBLE_SF",
    "position",
    "top",
    "MENU_G_FLEXIBILITY",
    "opacity",
    "PerspectiveCamera",
    "receiveShadow",
    "SIngle_Launch",
    "canvas",
    "stop",
    "float",
    "className",
    "menuBt62",
    "versatility",
    "DIV_MENU_G",
    "<span\x20style=\x22color:#fff\x22>Versatility:</span>\x20capacity\x20to\x20accommodate\x20<br>different\x20configurations\x20under\x20the\x20fairing",
    "btPerformance",
    "_CHARGE_SIMPLE",
    "AmbientLight",
    "material",
    "emissiveIntensity",
    "enableDamping",
    "PCFSoftShadowMap",
    "Camera003",
    "hidden",
    "bias",
    "target",
    "EquirectangularReflectionMapping",
    "width",
    "2300060aBeoiU",
    "fov",
    "indexOf",
    "DIV_ACCEUILCREDIT",
    "getElementsByName",
    "MeshLambertMaterial",
    "autoRotate",
    "distance",
    "4697684RJmWdN",
    "substring",
    "___CHARGE_005",
    "-150px",
    "OrbitControls",
    "DIV_OVERVIEW",
    "___CHARGE_001",
    "btVersatility",
    "beginPath",
    "onClick",
    "project",
    "scene",
    "addEventListener",
    "___CHARGE_006",
    "Vector3",
    "OverviewBt1",
    "length",
    "visible",
    "DIV_MAIN_MENU",
    "10px",
    "type",
    "___",
    "intersectObjects",
    "div",
    "Camera001Target",
    "enabled",
    "#FFFFFF",
    "3921408WcSSjq",
    "setFromCamera",
    "_CHARGE_LARGE_CONST",
    "setBooster(\x2764\x27)",
    "A\x20MODULAR\x20LAUNCHER",
    "pointerEvents",
    "OVERVIEW_V06.gltf",
  ];
  _0x3b43 = function () {
    return _0x357311;
  };
  return _0x3b43();
}
function clickOn3d() {
  const _0x82ae24 = _0x15829d;
  driveCam = ![];
  const _0x4f0706 = new THREE[_0x82ae24(0x1e3)](),
    _0x53c9e8 = new THREE[_0x82ae24(0x2b2)]();
  (_0x4f0706["x"] =
    (event[_0x82ae24(0x2ae)] / window["innerWidth"]) * 0x2 - 0x1),
    (_0x4f0706["y"] =
      -(event["clientY"] / window[_0x82ae24(0x258)]) * 0x2 + 0x1),
    _0x53c9e8[_0x82ae24(0x243)](_0x4f0706, camera);
  const _0x4f2414 = _0x53c9e8[_0x82ae24(0x23d)](scene["children"], !![]);
  if (_0x4f2414["length"] > 0x0) {
    if (activMode == _0x82ae24(0x20f)) {
      var _0x528633 = _0x4f2414[0x0][_0x82ae24(0x1e8)][_0x82ae24(0x28f)];
      if (_0x528633 == _0x82ae24(0x22d)) selectCharge(0x0);
      if (_0x528633 == _0x82ae24(0x272)) selectCharge(0x1);
      if (_0x528633 == _0x82ae24(0x1f0)) selectCharge(0x2);
      if (_0x528633 == "___CHARGE_004") selectCharge(0x3);
      if (_0x528633 == _0x82ae24(0x229)) selectCharge(0x4);
      if (_0x528633 == _0x82ae24(0x234)) selectCharge(0x5);
      if (_0x528633 == _0x82ae24(0x275)) selectCharge(0x6);
    }
  }
}
function create3Dscene(_0x163f15) {
  const _0x257ed8 = _0x15829d;
  (renderer = new THREE["WebGLRenderer"]({ antialias: aliasing, alpha: !![] })),
    (renderer[_0x257ed8(0x260)][_0x257ed8(0x240)] = shadow),
    renderer[_0x257ed8(0x1fc)](0x1),
    renderer[_0x257ed8(0x1f3)](window[_0x257ed8(0x26c)], window["innerHeight"]),
    document[_0x257ed8(0x2a3)](_0x163f15)[_0x257ed8(0x284)](
      renderer[_0x257ed8(0x257)]
    ),
    (renderer["shadowMap"][_0x257ed8(0x23b)] = THREE[_0x257ed8(0x218)]),
    (scene = new THREE[_0x257ed8(0x294)]()),
    (camera = new THREE[_0x257ed8(0x207)](
      0x19,
      window[_0x257ed8(0x26c)] / window["innerHeight"],
      0x1,
      0x7d0
    )),
    camera["position"][_0x257ed8(0x296)](0x0, 0x64, 0xc8),
    (controls = new THREE[_0x257ed8(0x22b)](
      camera,
      renderer[_0x257ed8(0x257)]
    )),
    controls[_0x257ed8(0x1fb)](window),
    (controls[_0x257ed8(0x217)] = !![]),
    (controls["dampingFactor"] = 0.05),
    (controls[_0x257ed8(0x27d)] = ![]),
    (controls[_0x257ed8(0x25f)] = ![]),
    (controls[_0x257ed8(0x1e6)] = 0.1),
    (controls[_0x257ed8(0x278)] = 0x384),
    (controls[_0x257ed8(0x225)] = ![]),
    (controls[_0x257ed8(0x25c)] = 0.1),
    (controls[_0x257ed8(0x21c)] = new THREE[_0x257ed8(0x235)](0x0, 0x0, 0x0));
}
function loadObjects(_0x27ae1c, _0x5bf482) {
  const _0x3cdd25 = _0x15829d,
    _0x490724 = new THREE[_0x3cdd25(0x29d)]()[_0x3cdd25(0x25b)](_0x27ae1c);
  _0x490724[_0x3cdd25(0x24f)](_0x5bf482, function (_0x20720c) {
    const _0x41af5a = _0x3cdd25;
    (model = _0x20720c[_0x41af5a(0x232)]),
      model[_0x41af5a(0x268)](function (_0x3ec226) {
        const _0x1a33e9 = _0x41af5a;
        if (_0x3ec226[_0x1a33e9(0x1f8)]) _0x3ec226[_0x1a33e9(0x289)] = shadow;
        if (_0x3ec226["isMesh"]) _0x3ec226[_0x1a33e9(0x208)] = shadow;
      }),
      (mixer = new THREE[_0x41af5a(0x2b3)](model)),
      mixer[_0x41af5a(0x250)](_0x20720c[_0x41af5a(0x28a)][0x0])[
        _0x41af5a(0x29e)
      ](),
      scene[_0x41af5a(0x1e1)](model),
      startScene();
  });
}
function setUpLights(_0x1308e2) {
  const _0x55487a = _0x15829d,
    _0xee0af3 = scene["getObjectByName"]("ARIANE_MAIN"),
    _0x109045 = new THREE[_0x55487a(0x214)](0x223344);
  scene[_0x55487a(0x1e1)](_0x109045),
    new THREE[_0x55487a(0x1ef)]()
      ["setPath"](_0x55487a(0x1e2))
      [_0x55487a(0x24f)]("ENV_V04_OPTI.hdr", function (_0x375d45) {
        const _0x3d4edd = _0x55487a;
        (_0x375d45[_0x3d4edd(0x1ea)] = THREE[_0x3d4edd(0x21d)]),
          (scene[_0x3d4edd(0x2ab)] = _0x375d45);
      }),
    _0x43328a(
      "Lbooster",
      0x1,
      0xffffff,
      0x800,
      new THREE[_0x55487a(0x235)](-0xa, -0xa, 0xa),
      new THREE[_0x55487a(0x235)](0x0, -0x2, 0x0)
    ),
    _0x43328a(
      "Lvinci",
      0.4,
      0xffffff,
      0x200,
      new THREE[_0x55487a(0x235)](-0xa, 0xa, 0xa),
      new THREE[_0x55487a(0x235)](0x0, 0x9, 0x0)
    ),
    _0x43328a(
      _0x55487a(0x2a6),
      1.1,
      0xffffff,
      0x200,
      new THREE[_0x55487a(0x235)](0xd, 0x19, 0xd),
      new THREE[_0x55487a(0x235)](0x0, 0xf, 0x0)
    ),
    _0x43328a(
      _0x55487a(0x1f4),
      1.3,
      0xffffff,
      0x200,
      new THREE[_0x55487a(0x235)](-0xa, -0x5, 0x0),
      new THREE[_0x55487a(0x235)](0x0, 0x14, 0x0)
    ),
    _0x43328a(
      _0x55487a(0x26f),
      0x1,
      0xffffff,
      0x400,
      new THREE[_0x55487a(0x235)](0x0, 0x1e, 0x0),
      new THREE[_0x55487a(0x235)](0x0, 0x14, 0x0)
    );
  function _0x43328a(
    _0x23c2c7,
    _0x54a277,
    _0x57311b,
    _0x3b137a,
    _0x53b5f5,
    _0x585b3e
  ) {
    const _0xcc4c5d = _0x55487a,
      _0x5570b9 = new THREE[_0xcc4c5d(0x25e)](_0x57311b, _0x54a277);
    _0xee0af3[_0xcc4c5d(0x264)](_0x5570b9),
      _0xee0af3[_0xcc4c5d(0x264)](_0x5570b9[_0xcc4c5d(0x21c)]),
      scene["add"](_0x5570b9),
      scene["add"](_0x5570b9[_0xcc4c5d(0x21c)]),
      (_0x5570b9[_0xcc4c5d(0x28f)] = _0x23c2c7),
      (_0x5570b9["angle"] = 0.2),
      (_0x5570b9[_0xcc4c5d(0x1fe)] = 0.7),
      (_0x5570b9["decay"] = 0x2),
      (_0x5570b9[_0xcc4c5d(0x226)] = 0xc8 * scale),
      _0x5570b9["position"][_0xcc4c5d(0x296)](
        _0x53b5f5["x"] * scale,
        _0x53b5f5["y"] * scale,
        _0x53b5f5["z"] * scale
      ),
      (_0x5570b9[_0xcc4c5d(0x289)] = shadow),
      _0x5570b9["target"]["position"][_0xcc4c5d(0x296)](
        _0x585b3e["x"] * scale,
        _0x585b3e["y"] * scale,
        _0x585b3e["z"] * scale
      ),
      (_0x5570b9[_0xcc4c5d(0x252)][_0xcc4c5d(0x21b)] = -0.00002),
      (_0x5570b9["shadow"][_0xcc4c5d(0x28d)][_0xcc4c5d(0x21e)] = _0x3b137a),
      (_0x5570b9[_0xcc4c5d(0x252)][_0xcc4c5d(0x28d)][_0xcc4c5d(0x1e5)] =
        _0x3b137a),
      (_0x5570b9[_0xcc4c5d(0x252)][_0xcc4c5d(0x271)] = 0x4);
  }
}
function setUpMaterial() {
  const _0x3bd9f0 = _0x15829d;
  var _0x480a17 = new THREE[_0x3bd9f0(0x224)]({
    opacity: 0x1,
    transparent: !![],
    depthWrite: !![],
  });
  (_0x480a17["emissive"] = new THREE["Color"](_0x3bd9f0(0x241))),
    (_0x480a17[_0x3bd9f0(0x216)] = 0x1),
    (_0x480a17[_0x3bd9f0(0x1fa)] = THREE[_0x3bd9f0(0x2b1)]);
  var _0x509776 = new THREE[_0x3bd9f0(0x224)]({
    opacity: 0.5,
    transparent: !![],
    depthWrite: !![],
  });
  (_0x509776["emissive"] = new THREE["Color"](_0x3bd9f0(0x200))),
    (_0x509776[_0x3bd9f0(0x216)] = 0x1),
    (_0x509776[_0x3bd9f0(0x1fa)] = THREE[_0x3bd9f0(0x2b1)]);
  var _0x418b78 = new THREE[_0x3bd9f0(0x224)]({
      opacity: 0x0,
      transparent: !![],
      depthWrite: !![],
    }),
    _0x4ed720 = new THREE[_0x3bd9f0(0x25d)]({
      side: THREE["DoubleSide"],
      opacity: 0x0,
      transparent: !![],
      depthWrite: ![],
    });
  scene[_0x3bd9f0(0x268)]((_0x38d46c) => {
    const _0x4034c6 = _0x3bd9f0;
    if (_0x38d46c instanceof THREE["Mesh"]) {
      try {
        _0x38d46c[_0x4034c6(0x28f)][_0x4034c6(0x221)](_0x4034c6(0x23c)) >=
          0x0 &&
          ((_0x38d46c[_0x4034c6(0x215)] = _0x4ed720),
          (_0x38d46c[_0x4034c6(0x289)] = ![]),
          (_0x38d46c[_0x4034c6(0x208)] = ![]));
      } catch (_0x5f1545) {
        console[_0x4034c6(0x1d6)](_0x5f1545);
      }
      try {
        _0x38d46c[_0x4034c6(0x28f)][_0x4034c6(0x221)](_0x4034c6(0x1f1)) >=
          0x0 &&
          ((_0x38d46c[_0x4034c6(0x215)] = _0x480a17),
          (_0x38d46c[_0x4034c6(0x289)] = ![]),
          (_0x38d46c["receiveShadow"] = ![]));
      } catch (_0x573a25) {
        console["log"](_0x573a25);
      }
    }
  });
}
function setUpOverview() {
  clearScreen(),
    highLightBt("btOverview"),
    setTimeout(function () {
      const _0x26c3fa = _0x4dbb;
      (activMode = _0x26c3fa(0x276)),
        (document[_0x26c3fa(0x2a3)]("DIV_MENU_G")[_0x26c3fa(0x2af)][
          _0x26c3fa(0x1e0)
        ] = -0x1),
        (document[_0x26c3fa(0x2a3)](_0x26c3fa(0x1de))[_0x26c3fa(0x2af)][
          _0x26c3fa(0x206)
        ] = 0x1),
        (document["getElementById"]("DIV_ACCEUILCONTAINER")[_0x26c3fa(0x2af)][
          _0x26c3fa(0x206)
        ] = 0x1),
        (document[_0x26c3fa(0x2a3)](_0x26c3fa(0x222))["style"][
          "opacity"
        ] = 0x1),
        (document[_0x26c3fa(0x2a3)](_0x26c3fa(0x222))["style"][
          _0x26c3fa(0x1e0)
        ] = 0x384),
        createOverviewLabel(),
        (document["getElementById"](_0x26c3fa(0x1df))["innerHTML"] =
          "A\x20VERSATILE<br>HIGH-PERFORMANCE\x20LAUNCHER"),
        (document[_0x26c3fa(0x2a3)](_0x26c3fa(0x265))["innerHTML"] =
          _0x26c3fa(0x2a4)),
        (scene["getObjectByName"](_0x26c3fa(0x1d3))[_0x26c3fa(0x25a)][
          "y"
        ] = 0x0),
        setCamPos(_0x26c3fa(0x2aa), _0x26c3fa(0x23f), !![]),
        (turnSpeed = 0x1),
        (realTime = !![]),
        (paused = ![]),
        (currentTime = 0x0),
        (endTime = 0x8),
        showHideSat(![]),
        (controls["minPolarAngle"] = 0.2),
        (controls[_0x26c3fa(0x24b)] = 0x2);
    }, 0x3e8);
}
function setUpModularity() {
  const _0x36e4e1 = _0x15829d;
  (document[_0x36e4e1(0x2a3)](_0x36e4e1(0x210))["className"] =
    "MENU_G_MODULARITY"),
    (activMode = _0x36e4e1(0x201)),
    clearScreen(),
    highLightBt(_0x36e4e1(0x290)),
    setTimeout(function () {
      const _0xde766b = _0x36e4e1;
      (document["getElementById"](_0xde766b(0x1de))[_0xde766b(0x2af)][
        _0xde766b(0x206)
      ] = 0x1),
        (document["getElementById"](_0xde766b(0x1d9))[_0xde766b(0x2af)][
          _0xde766b(0x206)
        ] = 0x1),
        (document[_0xde766b(0x2a3)](_0xde766b(0x1df))[_0xde766b(0x259)] =
          _0xde766b(0x246)),
        (document[_0xde766b(0x2a3)]("ACCEUILTEXTE")[_0xde766b(0x259)] =
          _0xde766b(0x2ad)),
        drawMenuModularity(),
        (scene[_0xde766b(0x266)]("TRUN_MAIN")[_0xde766b(0x25a)]["y"] = 0x0),
        setCamPos("Camera002", _0xde766b(0x1d0), !![]),
        (turnSpeed = 0.5),
        (realTime = !![]),
        (paused = ![]),
        (currentTime = 0xc),
        (endTime = 0xd),
        showHideSat(![]),
        (controls["minPolarAngle"] = 0x0),
        (controls[_0xde766b(0x24b)] = 3.14),
        setBooster("64");
    }, 0x3e8);
}
function setUpFlexibility() {
  const _0x22a8e6 = _0x15829d;
  (document[_0x22a8e6(0x2a3)](_0x22a8e6(0x210))[_0x22a8e6(0x20d)] =
    _0x22a8e6(0x205)),
    (activMode = _0x22a8e6(0x24a)),
    highLightBt("btFlexibility"),
    clearScreen(![]),
    (document[_0x22a8e6(0x2a3)](_0x22a8e6(0x274))[_0x22a8e6(0x21a)] = ![]),
    setTimeout(function () {
      const _0x2d90dc = _0x22a8e6;
      (window[_0x2d90dc(0x283)]["IFRAME1"][_0x2d90dc(0x2a2)] =
        "https://www.explore-studio.com/ARIANE_ESPACE/DEV_V02/FLEXIBILITY_V01.php"),
        (document[_0x2d90dc(0x2a3)](_0x2d90dc(0x274))["style"][
          _0x2d90dc(0x206)
        ] = 0x1),
        (document["getElementById"]("DIV_ACCEUILCONTAINER")[_0x2d90dc(0x2af)][
          _0x2d90dc(0x206)
        ] = 0x1),
        (document[_0x2d90dc(0x2a3)](_0x2d90dc(0x1df))[_0x2d90dc(0x259)] =
          _0x2d90dc(0x26d)),
        (document[_0x2d90dc(0x2a3)](_0x2d90dc(0x265))[_0x2d90dc(0x259)] =
          _0x2d90dc(0x2a7));
    }, 0x3e8);
}
function setUpVersatility() {
  const _0x1a0178 = _0x15829d;
  (activMode = _0x1a0178(0x20f)),
    highLightBt(_0x1a0178(0x22e)),
    clearScreen(),
    setTimeout(function () {
      const _0x51ebba = _0x1a0178;
      (document[_0x51ebba(0x2a3)](_0x51ebba(0x210))["style"][_0x51ebba(0x1e0)] =
        -0x1),
        (document[_0x51ebba(0x2a3)](_0x51ebba(0x1de))[_0x51ebba(0x2af)][
          _0x51ebba(0x206)
        ] = 0x1),
        (document[_0x51ebba(0x2a3)](_0x51ebba(0x1d9))[_0x51ebba(0x2af)][
          _0x51ebba(0x206)
        ] = 0x1),
        (document["getElementById"](_0x51ebba(0x1df))[_0x51ebba(0x259)] =
          _0x51ebba(0x1f6)),
        (document[_0x51ebba(0x2a3)](_0x51ebba(0x265))[_0x51ebba(0x259)] =
          "Ariane\x206\x20has\x20been\x20designed\x20to\x20accommodate\x20a\x20wide\x20range\x20of\x20space\x20missions,\x20from\x20telecommunications\x20satellites\x20to\x20scientific\x20missions\x20and\x20Earth\x20observation\x20programs.<br><br>Its\x20fairing\x20ranging\x20from\x2014\x20to\x2020\x20meters\x20high\x20and\x205.4\x20meters\x20in\x20diameter,\x20it\x20can\x20accommodate\x20and\x20protect\x20satellites\x20of\x20various\x20sizes.<br><br>The\x20PAF\x20(Payload\x20Adapter\x20Fitting)\x20optimizes\x20the\x20layout\x20of\x20payloads\x20under\x20the\x20fairing,\x20offering\x20maximum\x20flexibility\x20for\x20mission\x20configuration."),
        (scene["getObjectByName"](_0x51ebba(0x1d3))["rotation"]["y"] = 0x0),
        setCamPos(_0x51ebba(0x219), _0x51ebba(0x279), !![]),
        (turnSpeed = 0.2),
        (paused = ![]),
        (currentTime = 0x1d),
        (endTime = 0x5a),
        showHideSat(!![]),
        selectCharge(0x1),
        (controls["minPolarAngle"] = 0x1),
        (controls[_0x51ebba(0x24b)] = 0x2);
    }, 0x3e8);
}
function setUpPerformance() {
  const _0x26ee93 = _0x15829d;
  (activMode = _0x26ee93(0x269)),
    highLightBt(_0x26ee93(0x212)),
    clearScreen(![]),
    (document[_0x26ee93(0x2a3)](_0x26ee93(0x274))[_0x26ee93(0x21a)] = ![]),
    setTimeout(function () {
      const _0x55b8b5 = _0x26ee93;
      (window[_0x55b8b5(0x283)][_0x55b8b5(0x262)][_0x55b8b5(0x2a2)] =
        _0x55b8b5(0x28c)),
        (document[_0x55b8b5(0x2a3)](_0x55b8b5(0x274))[_0x55b8b5(0x2af)][
          "opacity"
        ] = 0x1),
        (document[_0x55b8b5(0x2a3)](_0x55b8b5(0x1d9))[_0x55b8b5(0x2af)][
          _0x55b8b5(0x206)
        ] = 0x1),
        (document[_0x55b8b5(0x2a3)](_0x55b8b5(0x1df))[_0x55b8b5(0x259)] =
          "A\x20HIGH-PERFORMANCE\x20LAUNCHER"),
        (document[_0x55b8b5(0x2a3)](_0x55b8b5(0x265))["innerHTML"] =
          "Available\x20in\x20two\x20configurations,\x20Ariane\x2062\x20and\x20Ariane\x2064,\x20the\x20Ariane\x206\x20launcher\x20ensures\x20maximum\x20performance\x20in\x20terms\x20of\x20payload\x20capacity.<br><br>High\x20modular,\x20the\x20launcher\x20can\x20serve\x20different\x20types\x20of\x20orbits\x20and\x20a\x20variety\x20of\x20missions\x20in\x20geostationary,\x20sun-synchronous,\x20low\x20Earth,\x20and\x20lunar\x20orbits.");
    }, 0x3e8);
}
function showHideSat(_0xa60e25) {
  const _0x57fdd2 = _0x15829d;
  scene[_0x57fdd2(0x268)]((_0x5594bb) => {
    const _0x257195 = _0x57fdd2;
    if (_0x5594bb instanceof THREE[_0x257195(0x277)])
      try {
        _0x5594bb[_0x257195(0x28f)][_0x257195(0x221)](_0x257195(0x1f1)) >=
          0x0 &&
          ((_0x5594bb[_0x257195(0x238)] = _0xa60e25),
          (_0x5594bb[_0x257195(0x208)] = ![]));
      } catch (_0x4367f7) {
        console[_0x257195(0x1d6)](_0x4367f7);
      }
  });
  let _0x4b19e4 = [
    _0x57fdd2(0x213),
    _0x57fdd2(0x2b6),
    _0x57fdd2(0x202),
    _0x57fdd2(0x1e9),
    _0x57fdd2(0x244),
  ];
  for (i = 0x0; i < _0x4b19e4[_0x57fdd2(0x237)]; i++) {
    try {
      var _0x1d8674 = scene[_0x57fdd2(0x266)](_0x4b19e4[i]);
      _0x1d8674[_0x57fdd2(0x268)]((_0x1cd86c) => {
        const _0x3e14b1 = _0x57fdd2;
        _0x1cd86c instanceof THREE["Mesh"] &&
          ((_0x1cd86c[_0x3e14b1(0x238)] = _0xa60e25),
          (_0x1cd86c[_0x3e14b1(0x289)] = ![]));
      });
    } catch (_0x4d65cf) {
      console[_0x57fdd2(0x1d6)](_0x4d65cf);
    }
  }
}
function clearScreen(_0x292180) {
  const _0x58a443 = _0x15829d;
  _0x292180 === undefined && (_0x292180 = !![]),
    (document[_0x58a443(0x2a3)](_0x58a443(0x210))[_0x58a443(0x2af)][
      _0x58a443(0x1e0)
    ] = 0x32),
    (document[_0x58a443(0x2a3)](_0x58a443(0x22c))[_0x58a443(0x259)] = ""),
    (allowRender = _0x292180),
    (document[_0x58a443(0x2a3)](_0x58a443(0x210))[_0x58a443(0x2af)][
      _0x58a443(0x206)
    ] = 0x0),
    (document["getElementById"](_0x58a443(0x274))["style"][
      _0x58a443(0x206)
    ] = 0x0),
    (document[_0x58a443(0x2a3)](_0x58a443(0x1de))[_0x58a443(0x2af)][
      "opacity"
    ] = 0x0),
    (document[_0x58a443(0x2a3)](_0x58a443(0x1d9))[_0x58a443(0x2af)][
      _0x58a443(0x206)
    ] = 0x0),
    (document[_0x58a443(0x2a3)](_0x58a443(0x222))[_0x58a443(0x2af)][
      _0x58a443(0x206)
    ] = 0x0),
    (document["getElementById"]("DIV_ACCEUILCREDIT")[_0x58a443(0x2af)][
      "zIndex"
    ] = -0x1),
    setTimeout(function () {
      const _0x52d739 = _0x58a443;
      document["getElementById"](_0x52d739(0x274))[_0x52d739(0x21a)] =
        _0x292180;
      if (_0x292180) window[_0x52d739(0x283)]["IFRAME1"][_0x52d739(0x2a2)] = "";
    }, 0x384);
}
function drawMenuModularity() {
  const _0x13b385 = _0x15829d;
  (document[_0x13b385(0x2a3)](_0x13b385(0x210))[_0x13b385(0x2af)][
    _0x13b385(0x206)
  ] = 0x1),
    (document[_0x13b385(0x2a3)](_0x13b385(0x210))[_0x13b385(0x259)] = "");
  var _0x236033 = document[_0x13b385(0x1fd)](_0x13b385(0x23e));
  (_0x236033["innerHTML"] = _0x13b385(0x29f)),
    (_0x236033["className"] = _0x13b385(0x282)),
    document[_0x13b385(0x2a3)](_0x13b385(0x210))[_0x13b385(0x284)](_0x236033);
  var _0x236033 = document["createElement"]("div");
  (_0x236033["id"] = "menuBt62"),
    (_0x236033[_0x13b385(0x259)] = _0x13b385(0x27c)),
    (_0x236033[_0x13b385(0x20d)] = _0x13b385(0x26e)),
    (_0x236033["style"][_0x13b385(0x20c)] = _0x13b385(0x2a9)),
    _0x236033[_0x13b385(0x251)]("onClick", _0x13b385(0x273)),
    document[_0x13b385(0x2a3)]("DIV_MENU_G")["appendChild"](_0x236033);
  var _0x236033 = document["createElement"](_0x13b385(0x23e));
  (_0x236033["id"] = _0x13b385(0x298)),
    (_0x236033[_0x13b385(0x259)] = _0x13b385(0x1dd)),
    (_0x236033[_0x13b385(0x2af)][_0x13b385(0x20c)] = _0x13b385(0x2a9)),
    (_0x236033[_0x13b385(0x20d)] = _0x13b385(0x26e)),
    _0x236033["setAttribute"](_0x13b385(0x230), _0x13b385(0x245)),
    document["getElementById"](_0x13b385(0x210))[_0x13b385(0x284)](_0x236033);
  var _0x236033 = document[_0x13b385(0x1fd)](_0x13b385(0x23e));
  (_0x236033["id"] = "divTxtNbBoosters"),
    (_0x236033[_0x13b385(0x259)] = _0x13b385(0x1d1)),
    (_0x236033["className"] = _0x13b385(0x263)),
    (_0x236033[_0x13b385(0x2af)][_0x13b385(0x20c)] = "left"),
    document[_0x13b385(0x2a3)](_0x13b385(0x210))["appendChild"](_0x236033);
  var _0x236033 = document[_0x13b385(0x1fd)](_0x13b385(0x23e));
  (_0x236033[_0x13b385(0x2af)]["clear"] = "left"),
    (_0x236033["id"] = _0x13b385(0x1d5)),
    (_0x236033[_0x13b385(0x259)] = ""),
    (_0x236033["className"] = _0x13b385(0x282)),
    (_0x236033["style"][_0x13b385(0x1e7)] = "20px"),
    document[_0x13b385(0x2a3)](_0x13b385(0x210))[_0x13b385(0x284)](_0x236033);
}
function setBooster(_0x292d00) {
  const _0xcfef45 = _0x15829d;
  let _0x555c0b =
      "Missions\x20for\x20large\x20scientific\x20and\x20institutional\x20spacecraft<br><br>Multi-Launch\x20Service\x20for\x20small\x20satellites\x20(MLS)\x20in\x20piggyback\x20or\x20rideshare\x20configurations<br><br>Delivery\x20of\x20payloads\x20to\x20multiple\x20orbits\x20with\x20the\x20same\x20launch",
    _0x4d0810 = _0xcfef45(0x1d4);
  var _0x3061ad = document[_0xcfef45(0x2a3)](_0xcfef45(0x20e)),
    _0x4ef2ef = document[_0xcfef45(0x2a3)](_0xcfef45(0x298)),
    _0x471c06 = document[_0xcfef45(0x2a3)](_0xcfef45(0x1d5));
  (_0x3061ad[_0xcfef45(0x2af)][_0xcfef45(0x28e)] = _0xcfef45(0x285)),
    (_0x4ef2ef[_0xcfef45(0x2af)][_0xcfef45(0x28e)] = _0xcfef45(0x285)),
    (_0x3061ad[_0xcfef45(0x2af)][_0xcfef45(0x206)] = 0.2),
    (_0x4ef2ef[_0xcfef45(0x2af)]["opacity"] = 0.2),
    (paused = ![]),
    (realTime = ![]),
    (endTime = 0x13),
    _0x292d00 == "62" &&
      ((targetTime = 0xd),
      (_0x3061ad["style"]["backgroundColor"] = _0xcfef45(0x200)),
      (_0x3061ad[_0xcfef45(0x2af)][_0xcfef45(0x206)] = 0x1),
      (document[_0xcfef45(0x2a3)](_0xcfef45(0x1d5))[_0xcfef45(0x259)] =
        _0x555c0b),
      (document["getElementById"](_0xcfef45(0x1ed))[_0xcfef45(0x259)] =
        "2\x20BOOSTERS")),
    _0x292d00 == "64" &&
      ((targetTime = 0x13),
      (_0x4ef2ef[_0xcfef45(0x2af)]["backgroundColor"] = "#6DA5E1"),
      (_0x4ef2ef["style"]["opacity"] = 0x1),
      (document[_0xcfef45(0x2a3)](_0xcfef45(0x1d5))[_0xcfef45(0x259)] =
        _0x4d0810),
      (document[_0xcfef45(0x2a3)](_0xcfef45(0x1ed))[_0xcfef45(0x259)] =
        _0xcfef45(0x2a5)));
}
function selectCharge(_0x23b594) {
  (realTime = ![]), (paused = ![]), (targetTime = configStart[_0x23b594]);
}
function updateLabelPostition() {
  const _0x3265dc = _0x15829d;
  var _0x51170e =
      renderer[_0x3265dc(0x249)]()[_0x3265dc(0x20a)][_0x3265dc(0x21e)],
    _0x46e471 =
      renderer[_0x3265dc(0x249)]()[_0x3265dc(0x20a)][_0x3265dc(0x1e5)];
  for (i = 0x0; i < stepsObj[_0x3265dc(0x237)]; i++) {
    var _0xbe4b55 = document["getElementById"](stepsObj[i] + _0x3265dc(0x26b)),
      _0x30b760 = scene["getObjectByName"](stepsObj[i]),
      _0xaa1fd1 = new THREE[_0x3265dc(0x235)]();
    _0x30b760[_0x3265dc(0x1ce)](),
      _0xaa1fd1[_0x3265dc(0x295)](_0x30b760["matrixWorld"]),
      _0xaa1fd1[_0x3265dc(0x231)](camera),
      (_0xaa1fd1["x"] = _0xaa1fd1["x"] * _0x51170e + _0x51170e),
      (_0xaa1fd1["y"] = -(_0xaa1fd1["y"] * _0x46e471) + _0x46e471),
      (_0xbe4b55["style"][_0x3265dc(0x204)] = _0xaa1fd1["y"] * 0.5 + "px"),
      (_0xbe4b55[_0x3265dc(0x2af)]["left"] = _0xaa1fd1["x"] * 0.5 + "px");
    if (stepsObj[i]["indexOf"](_0x3265dc(0x1ec)) >= 0x0) {
      let _0x317578 = stepsObj[i][_0x3265dc(0x221)](_0x3265dc(0x1ec)) + 0x6,
        _0x1d90d2 = stepsObj[i][_0x3265dc(0x221)](_0x3265dc(0x1ec)) + 0x6 + 0x4,
        _0x249228 = stepsObj[i][_0x3265dc(0x228)](_0x317578, _0x1d90d2),
        _0x4fcc92 = parseFloat(_0x249228) + 0.01,
        _0x35e900 = parseFloat(currentTime) + 0.01,
        _0x13a262 = stepsObj[i]["substring"](
          0x9,
          stepsObj[i]["indexOf"](_0x3265dc(0x1ec))
        );
      _0x4fcc92 < _0x35e900 * 0x1e + 0xa && _0x4fcc92 > _0x35e900 * 0x1e - 0x32
        ? (document[_0x3265dc(0x2a3)](stepsObj[i] + _0x3265dc(0x26b))["style"][
            _0x3265dc(0x206)
          ] = 0x1)
        : (document[_0x3265dc(0x2a3)](stepsObj[i] + _0x3265dc(0x26b))[
            _0x3265dc(0x2af)
          ][_0x3265dc(0x206)] = 0.1),
        _0x4fcc92 > _0x35e900 * 0x1e - 0x1 &&
          _0x4fcc92 < _0x35e900 * 0x1e + 0x1 &&
          _0x13a262 != prevTxt &&
          ((prevTxt = _0x13a262),
          (document[_0x3265dc(0x2a3)](_0x3265dc(0x297))["innerHTML"] =
            _0x13a262["replaceAll"]("_", "\x20")));
    }
  }
  try {
    var _0x30a4e9 = document[_0x3265dc(0x2a3)](_0x3265dc(0x291));
    (_0x30a4e9[_0x3265dc(0x2af)][_0x3265dc(0x280)] = _0x3265dc(0x2b0)),
      (_0x30a4e9[_0x3265dc(0x29c)] = function () {
        return ![];
      }),
      (_0x30a4e9[_0x3265dc(0x255)] = function () {
        return ![];
      }),
      (_0x30a4e9[_0x3265dc(0x2af)][_0x3265dc(0x247)] = "none");
    var _0x30b760 = animationTravBall,
      _0xaa1fd1 = new THREE["Vector3"]();
    _0x30b760[_0x3265dc(0x1ce)](),
      _0xaa1fd1[_0x3265dc(0x295)](_0x30b760[_0x3265dc(0x288)]),
      _0xaa1fd1[_0x3265dc(0x231)](camera),
      (_0xaa1fd1["x"] = _0xaa1fd1["x"] * _0x51170e + _0x51170e),
      (_0xaa1fd1["y"] = -(_0xaa1fd1["y"] * _0x46e471) + _0x46e471);
    let _0x2c95ae = document[_0x3265dc(0x2a3)](_0x3265dc(0x286)),
      _0xb28d53 = _0x2c95ae[_0x3265dc(0x1d8)](),
      _0x51e623 = _0xb28d53[_0x3265dc(0x2a9)] + 0x4b,
      _0x37c7a0 = _0xb28d53[_0x3265dc(0x204)] + 0x4b;
    var _0x3f7df8 = _0x30a4e9[_0x3265dc(0x249)]("2d");
    _0x3f7df8[_0x3265dc(0x281)](
      0x0,
      0x0,
      _0x30a4e9[_0x3265dc(0x21e)],
      _0x30a4e9[_0x3265dc(0x1e5)]
    ),
      _0x3f7df8[_0x3265dc(0x22f)](),
      (_0x3f7df8[_0x3265dc(0x27a)] = "1"),
      (_0x3f7df8["strokeStyle"] = _0x3265dc(0x29b)),
      (_0x3f7df8["globalAlpha"] = 0.4),
      _0x3f7df8["moveTo"](_0x51e623, _0x37c7a0),
      _0x3f7df8[_0x3265dc(0x1f5)](_0xaa1fd1["x"] * 0.5, _0xaa1fd1["y"] * 0.5),
      _0x3f7df8["stroke"]();
  } catch (_0x2c6d3f) {
    _0x2c6d3f;
  }
}
function createOverviewLabel() {
  const _0x1e2226 = _0x15829d;
  for (i = 0x0; i < overviewBtList[_0x1e2226(0x237)]; i++) {
    var _0x151b8f = document[_0x1e2226(0x1fd)](_0x1e2226(0x23e));
    (_0x151b8f["id"] = overviewBtList[i] + "_div"),
      (_0x151b8f[_0x1e2226(0x20d)] = "buttonFocus"),
      (_0x151b8f[_0x1e2226(0x2af)][_0x1e2226(0x204)] = 0x64 * i + "px"),
      (_0x151b8f[_0x1e2226(0x2af)][_0x1e2226(0x2a9)] = _0x1e2226(0x2ac)),
      _0x151b8f["setAttribute"]("onClick", overviewFnList[i]),
      document[_0x1e2226(0x2a3)]("DIV_OVERVIEW")[_0x1e2226(0x284)](_0x151b8f);
    var _0x1bb1af = document[_0x1e2226(0x1fd)](_0x1e2226(0x23e));
    (_0x1bb1af[_0x1e2226(0x259)] = overviewNameList[i]["toUpperCase"]()),
      (_0x1bb1af[_0x1e2226(0x20d)] = "buttonFocusTxt"),
      _0x151b8f["setAttribute"](_0x1e2226(0x230), overviewFnList[i]),
      document[_0x1e2226(0x2a3)](overviewBtList[i] + _0x1e2226(0x26b))[
        _0x1e2226(0x284)
      ](_0x1bb1af);
  }
}
function updateBtOverviewPosition() {
  const _0x52deb9 = _0x15829d;
  if (activMode == _0x52deb9(0x276))
    for (
      let _0x3b6107 = 0x0;
      _0x3b6107 < overviewBtList[_0x52deb9(0x237)];
      _0x3b6107++
    ) {
      let _0x220311 =
          renderer[_0x52deb9(0x249)]()[_0x52deb9(0x20a)][_0x52deb9(0x21e)],
        _0x4e36b5 =
          renderer[_0x52deb9(0x249)]()[_0x52deb9(0x20a)][_0x52deb9(0x1e5)],
        _0x14405a = document[_0x52deb9(0x2a3)](
          overviewBtList[_0x3b6107] + _0x52deb9(0x26b)
        ),
        _0x308a57 = scene[_0x52deb9(0x266)](overviewObjList[_0x3b6107]);
      var _0x1ea640 = new THREE[_0x52deb9(0x235)]();
      _0x308a57["updateMatrixWorld"](),
        _0x1ea640[_0x52deb9(0x295)](_0x308a57[_0x52deb9(0x288)]),
        _0x1ea640["project"](camera),
        (_0x1ea640["x"] = _0x1ea640["x"] * _0x220311 + _0x220311 - 0xa),
        (_0x1ea640["y"] = -(_0x1ea640["y"] * _0x4e36b5) + _0x4e36b5 - 0xa),
        (_0x14405a["style"]["top"] = _0x1ea640["y"] * 0.5 + "px"),
        (_0x14405a[_0x52deb9(0x2af)][_0x52deb9(0x2a9)] =
          _0x1ea640["x"] * 0.5 + "px");
    }
}
function updateAnimation(_0x3dbfcb) {
  const _0x84d3c2 = _0x15829d;
  !paused &&
    (!realTime && (currentTime += (targetTime - currentTime) * perfTime * 0x2),
    realTime && (currentTime += _0x3dbfcb),
    mixer[_0x84d3c2(0x261)](currentTime),
    currentTime > endTime && (paused = !![]));
}
function updateLightPos(_0x405ea4, _0x398489) {
  const _0x2d251b = _0x15829d;
  let _0x534253 = new THREE["Vector3"](0x0, 0x0, 0x0),
    _0x414c85 = scene[_0x2d251b(0x266)](_0x398489),
    _0x1c98d4 = _0x414c85[_0x2d251b(0x1f9)](_0x534253),
    _0x1ff243 = scene[_0x2d251b(0x266)](_0x405ea4)[_0x2d251b(0x21c)];
  (_0x1ff243["position"]["x"] = _0x1c98d4["x"]),
    (_0x1ff243[_0x2d251b(0x203)]["y"] = _0x1c98d4["y"]),
    (_0x1ff243[_0x2d251b(0x203)]["z"] = _0x1c98d4["z"]);
}
function updateCamPos() {
  const _0x1ff05b = _0x15829d;
  driveCam &&
    ((controls[_0x1ff05b(0x21c)]["x"] +=
      (target_posX - controls[_0x1ff05b(0x21c)]["x"]) * speed * 0x1 * perfTime),
    (controls[_0x1ff05b(0x21c)]["y"] +=
      (target_posY - controls[_0x1ff05b(0x21c)]["y"]) * speed * 0x1 * perfTime),
    (controls[_0x1ff05b(0x21c)]["z"] +=
      (target_posZ - controls["target"]["z"]) * speed * 0x1 * perfTime),
    (camera[_0x1ff05b(0x203)]["x"] +=
      (cam_posX - camera[_0x1ff05b(0x203)]["x"]) * speed * 0x1 * perfTime),
    (camera["position"]["y"] +=
      (cam_posY - camera[_0x1ff05b(0x203)]["y"]) * speed * 0x1 * perfTime),
    (camera[_0x1ff05b(0x203)]["z"] +=
      (cam_posZ - camera[_0x1ff05b(0x203)]["z"]) * speed * 0x1 * perfTime));
}
function setCamPos(_0x4e5431, _0x47e146, _0x4b51fc) {
  const _0x1a39f6 = _0x15829d;
  try {
    driveCam = !![];
    var _0x290fe7 = new THREE[_0x1a39f6(0x235)](0x0, 0x0, 0x0),
      _0x1af13d = new THREE[_0x1a39f6(0x235)](0x0, 0x0, 0x0),
      _0x50089f = new THREE[_0x1a39f6(0x235)](0x0, 0xa, 0x32),
      _0x36d16c = new THREE["Vector3"](0x0, 0x0, 0x0),
      _0x2650d5 = 0x96;
    if (_0x4e5431 != null) {
      var _0x58fb1c = scene["getObjectByName"](_0x4e5431);
      _0x50089f = _0x58fb1c[_0x1a39f6(0x1f9)](_0x290fe7);
    }
    if (_0x47e146 != null) {
      var _0x58fb1c = scene["getObjectByName"](_0x47e146);
      _0x36d16c = _0x58fb1c[_0x1a39f6(0x1f9)](_0x1af13d);
    }
    (cam_posX = _0x50089f["x"]),
      (cam_posY = _0x50089f["y"]),
      (cam_posZ = _0x50089f["z"]),
      (target_posX = _0x36d16c["x"]),
      (target_posY = _0x36d16c["y"]),
      (target_posZ = _0x36d16c["z"]),
      _0x4b51fc &&
        ((controls[_0x1a39f6(0x21c)]["x"] = target_posX),
        (controls[_0x1a39f6(0x21c)]["y"] = target_posY),
        (controls[_0x1a39f6(0x21c)]["z"] = target_posZ),
        (camera[_0x1a39f6(0x203)]["x"] = cam_posX),
        (camera["position"]["y"] = cam_posY),
        (camera["position"]["z"] = cam_posZ));
  } catch (_0x3f0b6c) {
    console["log"](_0x1a39f6(0x299) + _0x3f0b6c);
  }
}
let show = !![];
function handleShortcut(_0x2c71af) {
  const _0xd135e5 = _0x15829d;
  _0x2c71af[_0xd135e5(0x2b5)] === "h" &&
    (clearScreen(),
    (document["getElementById"](_0xd135e5(0x239))["hidden"] = show)),
    DIV_MAIN_MENU,
    (show = !show);
}
function _0x4dbb(_0x8c03a4, _0x193942) {
  const _0x3b43b3 = _0x3b43();
  return (
    (_0x4dbb = function (_0x4dbb23, _0xb1b336) {
      _0x4dbb23 = _0x4dbb23 - 0x1ce;
      let _0x134dcc = _0x3b43b3[_0x4dbb23];
      return _0x134dcc;
    }),
    _0x4dbb(_0x8c03a4, _0x193942)
  );
}
var MouseStratPosX = 0x0,
  MouseStratPosY = 0x0,
  allowMove = ![],
  pervDelta = 0x0;
let mouseMode = _0x15829d(0x20b);
function mouseMoved(_0x4cb8df, _0xa41ed6, _0x2ea0dc) {
  const _0x373eeb = _0x15829d;
  if (activMode == _0x373eeb(0x20f)) {
    if (mouseMode == _0x373eeb(0x24d)) {
      let _0x2621de = _0x4cb8df - MouseStratPosX;
      if (camera[_0x373eeb(0x203)]["z"] < 0x0)
        targetTime += _0x2621de * perfTime * 0.2;
      if (camera[_0x373eeb(0x203)]["z"] > 0x0)
        targetTime -= _0x2621de * perfTime * 0.2;
      0x1e > targetTime && (targetTime = 29.9),
        targetTime > 0x3c && (targetTime = 59.9),
        (realTime = ![]),
        setTimeout(function () {
          MouseStratPosX = _0x4cb8df;
        }, 0x32);
    }
    if (mouseMode == _0x373eeb(0x1ee)) {
      if (0x1e < targetTime && targetTime < 0x20)
        selectCharge(0x0), console["log"](0x0);
      else {
        if (0x20 < targetTime && targetTime < 0x25)
          selectCharge(0x1), console["log"](0x1);
        else {
          if (0x25 < targetTime && targetTime < 0x2a)
            selectCharge(0x2), console[_0x373eeb(0x1d6)](0x2);
          else {
            if (0x2a < targetTime && targetTime < 0x2f)
              selectCharge(0x3), console[_0x373eeb(0x1d6)](0x3);
            else {
              if (0x2f < targetTime && targetTime < 0x34)
                selectCharge(0x4), console[_0x373eeb(0x1d6)](0x4);
              else {
                if (0x34 < targetTime && targetTime < 0x39)
                  selectCharge(0x5), console["log"](0x5);
                else
                  0x39 < targetTime &&
                    targetTime < 0x3c &&
                    (selectCharge(0x6), console[_0x373eeb(0x1d6)](0x6));
              }
            }
          }
        }
      }
      mouseMode = "stop";
    }
  }
}
(onmousedown = function (_0x365994) {
  const _0x56e368 = _0x15829d;
  (MouseStratPosX = _0x365994[_0x56e368(0x2ae)]),
    (MouseStratPosY = _0x365994[_0x56e368(0x253)]);
}),
  (onmousemove = function (_0x27d2fc) {
    const _0x2b5a87 = _0x15829d;
    mouseMoved(_0x27d2fc["clientX"], _0x27d2fc[_0x2b5a87(0x253)]);
  }),
  (onmouseup = function (_0x2775c2) {
    (mouseMode = "end"), mouseMoved();
  }),
  (ontouchstart = (_0x50b8ba) => {
    const _0xb79ce9 = _0x15829d;
    (MouseStratPosX = _0x50b8ba["touches"][0x0][_0xb79ce9(0x2ae)]),
      (MouseStratPosY = _0x50b8ba[_0xb79ce9(0x254)][0x0]["clientY"]);
  }),
  (ontouchmove = (_0x3b1a1e) => {
    const _0x5eaccf = _0x15829d;
    mouseMoved(
      _0x3b1a1e[_0x5eaccf(0x254)][0x0][_0x5eaccf(0x2ae)],
      _0x3b1a1e["touches"][0x0][_0x5eaccf(0x253)],
      _0x5eaccf(0x1db)
    );
  }),
  (ontouchend = (_0x2f9c33) => {
    const _0xd1888b = _0x15829d;
    (mouseMode = _0xd1888b(0x1ee)), mouseMoved();
  }),
  document[_0x15829d(0x233)](_0x15829d(0x27b), handleShortcut);
function highLightBt(_0x3cbf6c) {
  const _0x462301 = _0x15829d;
  let _0x480364 = document[_0x462301(0x223)](_0x462301(0x1dc));
  for (
    let _0x4ebab8 = 0x0;
    _0x4ebab8 < _0x480364[_0x462301(0x237)];
    _0x4ebab8++
  )
    _0x480364[_0x4ebab8][_0x462301(0x20d)] = _0x462301(0x2a1);
  document["getElementById"](_0x3cbf6c)[_0x462301(0x20d)] = _0x462301(0x1f7);
}
function divide(_0x3ab24b, _0x4553aa) {
  return _0x3ab24b / _0x4553aa;
}
