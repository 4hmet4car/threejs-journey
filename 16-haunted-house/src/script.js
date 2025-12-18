import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial()
)
floor.rotation.x=-Math.PI*0.5
scene.add(floor)

// House container
const house = new THREE.Group()
scene.add(house)

// Atelier container
const atelier = new THREE.Group()
scene.add(atelier)

// Living container
const living = new THREE.Group()
scene.add(living)

// Walls
const atelierLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.9,1.5,10,1,1,1),
    new THREE.MeshStandardMaterial()
)
atelierLeft.position.y=atelierLeft.geometry.parameters.height*0.5
atelierLeft.position.z=-atelierLeft.geometry.parameters.depth*0.5
atelierLeft.position.x=-0.05

const atelierFront = new THREE.Mesh(
    new THREE.BoxGeometry(0.1,1.5,0.5,1,1,1),
    new THREE.MeshStandardMaterial()
)
atelierFront.position.y=atelierFront.geometry.parameters.height*0.5
atelierFront.position.z=-atelierFront.geometry.parameters.depth*0.5
atelierFront.position.x=0.45

const atelierBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.1,1.5,3,1,1,1),
    new THREE.MeshStandardMaterial()
)
atelierBack.position.y=atelierBack.geometry.parameters.height*0.5
atelierBack.position.z=-atelierBack.geometry.parameters.depth*0.5-1
atelierBack.position.x=0.45

const atelierBottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.1,0.2,3,1,1,1),
    new THREE.MeshStandardMaterial()
)
atelierBottom.position.y=atelierBottom.geometry.parameters.height*0.5
atelierBottom.position.z=-atelierBottom.geometry.parameters.depth*0.5-0.5
atelierBottom.position.x=0.45

const atelierTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.1,0.6,3,1,1,1),
    new THREE.MeshStandardMaterial()
)
atelierTop.position.y=atelierTop.geometry.parameters.height*0.5+0.9
atelierTop.position.z=-atelierTop.geometry.parameters.depth*0.5-0.5
atelierTop.position.x=0.45

atelier.add(atelierLeft,atelierFront,atelierBack,atelierBottom,atelierTop)

const livingTop = new THREE.Mesh(
    new THREE.BoxGeometry(1,3.05,10,1,1,1),
    new THREE.MeshStandardMaterial()
)
livingTop.position.y=livingTop.geometry.parameters.height*0.5+0.95
livingTop.position.x=0.9
livingTop.position.z=-livingTop.geometry.parameters.depth*0.5+-2

const livingHump = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,1.75,0.25,1,1,1),
    new THREE.MeshStandardMaterial()
)
livingHump.position.y=livingHump.geometry.parameters.height*0.5+2.5
livingHump.position.x=1.15
livingHump.position.z=-livingHump.geometry.parameters.depth*0.5+-1.75

living.add(livingTop,livingHump)

const enterance = new THREE.Mesh(
    new THREE.BoxGeometry(1,0.95,10,1,1,1),
    new THREE.MeshStandardMaterial()
)
enterance.position.y=enterance.geometry.parameters.height*0.5
enterance.position.x=0.9
enterance.position.z=-enterance.geometry.parameters.depth*0.5+-4

const middleBalcony = new THREE.Mesh(
    new THREE.BoxGeometry(0.95,0.55,0.1,1,1,1),
    new THREE.MeshStandardMaterial()
)
middleBalcony.position.y=middleBalcony.geometry.parameters.height*0.5
middleBalcony.position.x=0.925
middleBalcony.position.z=-middleBalcony.geometry.parameters.depth*0.5-2

const middleBalconyRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.1,0.55,1,1,1,1),
    new THREE.MeshStandardMaterial()
)
middleBalconyRight.position.y=middleBalconyRight.geometry.parameters.height*0.5
middleBalconyRight.position.x=1.35
middleBalconyRight.position.z=-middleBalconyRight.geometry.parameters.depth*0.5-2.1

const middleBalconyTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.1,0.4,0.5,1,1,1),
    new THREE.MeshStandardMaterial()
)
middleBalconyTop.position.y=middleBalconyTop.geometry.parameters.height*0.5+0.55
middleBalconyTop.position.x=1.35
middleBalconyTop.position.z=-middleBalconyTop.geometry.parameters.depth*0.5-2.6

const inStairs = new THREE.Mesh(
    new THREE.BoxGeometry(0.8,3,10,1,1,1),
    new THREE.MeshStandardMaterial()
)
inStairs.position.y=inStairs.geometry.parameters.height*0.5
inStairs.position.x=1.8
inStairs.position.z=-inStairs.geometry.parameters.depth*0.5-4

const closet = new THREE.Mesh(
    new THREE.BoxGeometry(1,3,10,1,1,1),
    new THREE.MeshStandardMaterial()
)
closet.position.y=closet.geometry.parameters.height*0.5
closet.position.x=2.7
closet.position.z=-closet.geometry.parameters.depth*0.5-3.5

const bedroom = new THREE.Mesh(
    new THREE.BoxGeometry(1,1.5,0.5,1,1,1),
    new THREE.MeshStandardMaterial()
)
bedroom.position.y=bedroom.geometry.parameters.height*0.5+1
bedroom.position.x=2.7
bedroom.position.z=-bedroom.geometry.parameters.depth*0.5-3

const rightBalcony = new THREE.Mesh(
    new THREE.BoxGeometry(2.5,0.55,0.1,1,1,1),
    new THREE.MeshStandardMaterial()
)
rightBalcony.position.y=rightBalcony.geometry.parameters.height*0.5
rightBalcony.position.x=3.45
rightBalcony.position.z=-rightBalcony.geometry.parameters.depth*0.5-3

const rightBalconyRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.6,0.9,0.1,1,1,1),
    new THREE.MeshStandardMaterial()
)
rightBalconyRight.position.y=rightBalconyRight.geometry.parameters.height*0.5+0.55
rightBalconyRight.position.x=4.4
rightBalconyRight.position.z=-rightBalconyRight.geometry.parameters.depth*0.5-3

const rightBalconyTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.9,0.45,0.1,1,1,1),
    new THREE.MeshStandardMaterial()
)
rightBalconyTop.position.y=rightBalconyTop.geometry.parameters.height*0.5+1
rightBalconyTop.position.x=2.9+0.75
rightBalconyTop.position.z=-rightBalconyTop.geometry.parameters.depth*0.5-3

house.add(atelier,living,enterance,middleBalcony,middleBalconyRight,middleBalconyTop,inStairs,closet,bedroom,rightBalcony,rightBalconyRight,rightBalconyTop)


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2.4*1
camera.position.y = 2.4*1
camera.position.z = 2.6*1
scene.add(camera)

// window.addEventListener('mousedown',()=>{
//     console.log(camera.position)
// })

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target.copy(enterance.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()