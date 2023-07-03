
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800,450);
document.body.appendChild(renderer.domElement);

// 创建容器
const container = new THREE.Object3D()
scene.add(container);
// 创建正方体1
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
container.add(cube);
// 创建正方体2
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0x409eff });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(0,0,-1)

container.add(cube2);
// 渲染循环
function animate() {
    requestAnimationFrame(animate);

    // 旋转正方体
    container.rotation.x += 0.01;
    container.rotation.y += 0.01;

    renderer.render(scene, camera);
}
// 开始渲染循环
animate();
