import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Loading Manager
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
}

loadingManager.onLoad = function ( ) {
    console.log( 'Loading complete!')
}

loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
} 

loadingManager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url )
}

// Scene
const scene = new THREE.Scene()

// // Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(loadingManager)
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Object
 */
const self = new THREE.Group()

const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshMatcapMaterial({map:matcapTexture,wireframe:true})
)
head.position.y = 2.8

const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.2, 0.4),
    new THREE.MeshMatcapMaterial({map:matcapTexture})
)
body.position.y = 1.8

const leg1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 1.2, 0.4),
    new THREE.MeshMatcapMaterial({map:matcapTexture})
)
leg1.position.x = -0.2
leg1.position.y = 0.6

const leg2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 1.2, 0.4),
    new THREE.MeshMatcapMaterial({map:matcapTexture})
)
leg2.position.x = 0.2
leg2.position.y = 0.6

const arm1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 1.2, 0.4),
    new THREE.MeshMatcapMaterial({map:matcapTexture})
)
arm1.position.x = -0.6
arm1.position.y = 1.8

const arm2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 1.2, 0.4),
    new THREE.MeshMatcapMaterial({map:matcapTexture})
)
arm2.position.x = 0.6
arm2.position.y = 1.8

self.add(head,body,leg1,leg2,arm1,arm2)
self.position.y = -1.6

scene.add(self)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const zoom = 4

let aspect = (sizes.width / sizes.height) * zoom

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    aspect = (sizes.width / sizes.height) * zoom

    // Update camera
    // camera.aspect = sizes.width / sizes.height
    camera.left = -aspect
    camera.right = aspect
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera( -aspect, aspect, zoom, -zoom, 0.1, 100)
camera.position.x = 1
camera.position.y = 0.5
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('BLACK')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // // Add text
    // if(texts.length && addedTexts){
    //     scene.add(texts[0])
    //     addedTexts-=1
    // }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()