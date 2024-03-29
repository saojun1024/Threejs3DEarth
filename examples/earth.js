
// 工具类函数







// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
camera.position.set(0,10,10)
camera.lookAt(0,0,0)
// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800,400);
document.body.appendChild(renderer.domElement);
const gridHelper = new THREE.GridHelper(20,20,0x409eff,0x409eff);
scene.add(gridHelper);

// 创建一个轴线
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);




const container = new THREE.Object3D()
scene.add(container);

const geometry = new THREE.BoxGeometry(6, 6, 6);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry, material);


const geometry2 = new THREE.BoxGeometry(4, 4, 4);
const material2 = new THREE.MeshBasicMaterial({ color: 0xCC99FF});
const cube2 = new THREE.Mesh(geometry2, material2);
scene.add(cube1)
scene.add(cube2)


// 球体
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2,32,32), new THREE.MeshBasicMaterial({ color: 0xCC99FF})); 
scene.add(sphere)

cube2.matrixAutoUpdate = false
sphere.matrixAutoUpdate = false
const matrix = new THREE.Matrix4().makeTranslation(0,0,0)
cube2.applyMatrix4(matrix)
sphere.applyMatrix4(new THREE.Matrix4().makeTranslation(0,6,0))

// 渲染循环
function animate() {
  //requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();