var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BufferGeometry();
var positions = [];
var count = 3000; // 点的数量

// 生成随机的点位置
for (var i = 0; i < count; i++) {
  var phi = Math.acos(-1 + (2 * i) / count);
  var theta = Math.sqrt(count * Math.PI) * phi;

  var x = Math.cos(theta) * Math.sin(phi);
  var y = Math.sin(theta) * Math.sin(phi);
  var z = Math.cos(phi);

  positions.push(x, y, z);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

var material = new THREE.PointsMaterial({ color: 0x33a1c9, size: 0.01 });

var points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);
  points.rotation.x += 0.001;
  points.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();