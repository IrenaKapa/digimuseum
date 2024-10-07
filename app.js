import * as THREE from 'three';
import { PointerLockControls } from 'three-stblib';

//scene
const scene = new THREE.Scene(); // create the scene

//camera
const camera = new THREE.PerspectiveCamera(
    60, // the field of view
    window.innerWidth / window.innerHeight, // aspect ratio (fixed typo)
    0.1, // near
    1000 // far
);
scene.add(camera);
camera.position.z = (0, 3, 0); // move camera 5 units

//renderer
const renderer = new THREE.WebGLRenderer({antialias: true}); // corrected typo
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // background color (fixed typo)
document.body.appendChild(renderer.domElement); // attach the renderer

renderer.shadowMap.enabled = true; //enable the shadow mapping
renderer.shadowMap = THREE.PCFShadowMap;  

controls = new PointerLockControls(camera, renderer.domElement); // pointerlock controls takes the camera and render domElement as arguments.
//a class that allows camera to be controlled by mouse and keyboard
scene.add(controls.getObject()); // add the PointerLockControls object to the scene

window.addEventListener('resize', onWindowResize, false); // 

function onWindowResize() {
  camera.aspect =  window.innerWidth / window.innerHeight; // the camera aspect ratio is used to determine how 3D points are mapped to the 2D space of the screen.
  camera.updateProjectionMatrix(); // 
  renderer.setSize(window.innerWidth, window.innerHeight); //update the size of renderer


return {camera, controls, renderer }; // return these parameters so they can be used in other modules
};



/// create 3D MODELS, here i will do it for painting and i''l change it
function createPainting(imageURL, width, height, position) {
  const textureLoader = new THREE.TextureLoader(); // we need a texture loader the image
  const paintingTexture = textureLoader.load(imageURL); // method to load the image
  const paintingMaterial = new THREE.MeshBasicMaterial({
    //meshbasic material its a material that doesnt react to ligh
    map: paintingTexture, // map is property of the material which takes a texture and applies it to the surace of the geometri
  });
  const paintingGeometry = new THREE.PlaneGeometry(width, height); 
  const painting = new THREE.Mesh(paintingGeometry, paiintingMaterial);
  painting.position.set(position.x, position.y, position.z); // set the position of the painting
  return painting; // this function returns the paintings
  }

  //add the paintings to the scene
  const painting1 = createPainting(
    '/artworks/0.jpg', // url or path
    10, // width
    5, // height
    new THREE.Vector3(-10, 5, 19.99) // position in x, y, z coordinates
  ); 

  //painting on the front wall at the right
  const painting2 = createPainting(
    'artworks/1'.jpg',
    10,
    5,
    new.THREE.Vector3(10,5, 19.99)
  );


  const painting3 = createPainting(
    '/artwork/3.jpg',
    10,
    5,
    new THREE.Vector3( 19.99, 5, 10)
    
  );
  painting3.rotation.y = Math.PI / 2; // 90 degrees. we must rotate this

  const painting4 = createPainting(
    '/artworks/4.jph',
    10,
    5,
    new THREE.Vector3(19.99, 5, 10)
  );
  painting4.rotation.y = -Math.PI / 2; // 90 deegres

  scene.add(
    painting1,
    painting2,
    painting3



  ); 
  //add t7he paintings to the scene



  //ex for models info
  export function displayPaintingInfo(info) {
    const infoElement = document.getElementById('painting-info'); 

    //html content inside info element
    infoElement.innerHTML = '
    <h3>$info.title</h3>
    <p>Artist: ${info.artist}</p>
    <p>Description: ${info.description}</p>
    <p>Year: ${info.year}</p>'
    
    ;
    info.Element.classList.add('show'); // add the show class
  } // xreiazetai dior8wsh

  //hide painting info at the DOM
  export function hidePaintingInfo() {
    const infoElement = document.getElementById('painting-info'); //the reference
    infoElement.classList.remove('show'); // remove the 'show' class
  }

//let there be light
const ambientLight = new THREE.AmbientLight(0x101010, 1.0);
ambientLight.position = camera.position; // light follows camera
scene.add(ambientLight);

//Directional Light (Sunlight)
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity
sunLight.position.y = 15; // position
scene.add(sunLight);


//Cube
const geometry = new THREE.BoxGeometry(1, 1, 1); // cube geometry
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red cube
const cube = new THREE.Mesh(geometry, material);
scene.add(cube); // add the cube to the scene

//Controls
document.addEventListener("keydown", onKeyDown, false);

//creating the floor place
//texture floor
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('img/floor.jpg');
floor.Texture.warpS = THREE.RepeatWrapping;
floor.Texture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);


//create the floor plane
const planeGeometry = new THREE.PlaneBufferGeometry(45, 45)//boxgeometry the shape of the object
const planeMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
  side: THREE.DoubleSide,
});
 
let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

floorPlane.rotation.x = Math.PI / 2; //this is 90 degrees rotation
floorPlane.position.y = -Math.PI;// this is -180 degrees

scene.add(floorPlane);// add the floor to the scene


//create the walls
const wallGroup = new THREE.Group(); //create a group to hold the walls
scene.add(wallGroup);

//create wall material with realistic colors and texture
const wallTexture = textureLoader.load('img/white.texture.jpg');
wallTexture.wrapS = THREE.RepeatWrapping; // wrapS is the horizontal direction for wall texture
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(1, 1); // this defines the repeat of texture

const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture }); // create the material with the texture for the walls


//front wall
const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(80, 20, 0.001),
  new THREE.MeshBasicMaterial({ map: wallTexture})
);

frontWall.position.z = -20;

//left wall geometry and material
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(80, 20, 0.001),
  new THREE.MeshBasicMaterial({ map: wallTexture })
);

leftWall.rotation.y = Math.PI / 2; //90 deegres
leftWall.position.x = -20; // -20 is for units left


//right wall
const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(80, 20, 0.001),
   new THREE.MeshBasicMaterial({ map: wallTexture })
);

//Right wall
rightWall.rotation.y = Math.PI / 2; //this is 90 deegres
rightWall.rotation.x = 20;

// back wall
const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(85, 20, 0.01),
  new THREE.MeshLambertMaterial({ map: wallTexture })
);
backWall.position.z = 20;

wallGroup.add(frontWall, backWall, leftWall, rightWall);

//loop through each wall and create the bonding box
for (let i= 0; i < wallGroup.children.lenght; i++){
  wallGroup.children[i].BoundingBox = new THREE.Box3();
  wallGroup.children[i].BoundingBox.setFromObject(wallGroup.children[i]);
}

function checkCollision() {
  const playerBoundingBox = new THREE.Box3(); // bounding box for the player
  const cameraWorldPosition = new THREE.Vector3(); // vector to hold the camera

  camera.getWorldPostion(cameraWorldPosition); // camera position in the vector

playerBoundingBox.setFromCenterAndSize(
  cameraWorldPosition,
  new THREE.Vector3(1, 1, 1)
);

//loop through each wall
for (let i = 0; i < wallGroup.children.length; i++) {
  const wall = wallGroup.children[i]; // get the wall
  if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
    return true; // so if its does return true

  }
}

return false; // if it doesn't, return false

//create the ceiling
const ceilingTexture = textureLoader.load('img.white-texture.jpg');
const ceilingGeometry = new THREE.PlaneGeometry(45, 40);
const ceilingMaterial = new THREE.MeshBasicMaterial({ map: ceilingTexture });
const ceilingPlane = new THREE.Mesh(ceilingGeometry,ceilingMaterial);

ceilingPlane.rotation.x = Math.PI / 2; // 90 deegres
ceilingPlane.rotation.y = 10;

scene.add(ceilingPlane);

//optimize lights and shadows
renderer.shadowMap.enabled = true;// enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // a property tha defines the type of shadow by renderer

// enable shadows on objects
floorPlane.receiveShadow = true;
ceilingPlane.receiveShadow = true;
frontWall.castShadow =  true;
frontWall.receiveShadow =  true;
leftWall.castShadow = true;
leftWall.receiveShadow = true;
rightWall.castShadow = true;
rightWall.receiveShadow = true;
backWall.castShadow = true;
backWall.receiveShadow = true;
painting1.castShadow = true;
painting1.receiveShadow = true;
painting2.receiveShadow = true;
painting2.castShadow = true;


//i wanna do this for 3d models
function createPainting(imageURL, width, height, position){
  // ... 
  const textureLoader = new THREE.textureLoader();
  const paintingTexture = textureLoader.load(imageURL)
  const paiintingMaterial = new THREE.MeshBasicMaterial({
    map: paintingTexture,
  });
  const paintingGeometry = new THREE.PlaneGeometry(width, height)
  const painting = new THREE.Mesh(paintingGeometry, paiintingMaterial);
  painting.position.set(position.x, position.y, position.z)
  return painting;
}

// pio panw ta paintings h alliws 3D Models
const painting1 = createPainting(
 // 'the path of the model'. obj, 10, 5, new THREE.Vector3{ 10, 5, 20});


// we need to add the 3D MODELS!!!

scene.add(painting1, painting2);


//controls movement
const controls = new PointerLockControls(camera, documen.body);

//lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience(){
  //  reset clock
  clock.start();
  //lock the pointer
  controls.lock();
  //hide the menu
  hideMenu();
}

const playButton = document.getElementById("play_button")
playButton.addEventListener("click", startExperience);

//hide menu
function hideMenu(){
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
}

//show menu
function showMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
}

controls.addEventListener('unlock', showMenu);

//object to hold the keys pressed
const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

document.addEventListener(
  'keydown', // is an event that fires when a key is pressed
  (event) => {
    if (event.key in keysPressed) {
      // check if the key released is in the keyPressed object
      keysPressed [event.key] = false;//
    }
  },
  false
);
//when you realese the keys

document.addEventListener(
  'keyup', // is an event that fires when a key is pressed
  (event) => {
    if (event.key in keysPressed) {
      // check if the key released is in the keyPressed object
      keysPressed [event.key] = false;//
    }
  },
  false
);


// add the movement (left/right/forward/backward) to the scene 
const clock = new THREE.Clock();

function updateMovement(delta) {
  const moveSpeed = 5 * delta; 
  // movespeed is the distance the camera will move in one second 
  const previousPosition = camera.position.clone(); // clon ethe camera position before the movement

  if (keysPressed.ArrowRight || keysPressed.d) {
    controls.moveRight (moveSpeed);
  }
  if (keysPressed.ArrowLeft || keysPressed.a) {
    controls.moveRight( moveSpeed);
  }
  if (keysPressed.ArrowUp || keysPressed.w) {
    controls.moveForward(moveSpeed);
  }
  if(keysPressed.ArrowDown || keysPressed.s) {
    controls.moveForward (-moveSpeed);
  }

  // after the movement is applied, we must chekck for collision by calling collisiion function and we revert the camera's position to its previous position, effectively preventing the player for moving throught thw walls
  if (checkCollision()) {
    camera.position.copy(previousPosition); // reset the camera to the previous postion. The previous position variable is a clone of the camera before the movement
  }
}



// Render loop
let render = function () {
  const delta = clock.getDelta();
  updateMovement(delta);
  renderer.render(scene, camera); // render the scene
  requestAnimationFrame(render); // keep rendering
};

render();
