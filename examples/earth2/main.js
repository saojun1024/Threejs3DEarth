

function getPosColor(x,y){
  const sum = (imageData.width*y) - (imageData.width -x) - 1
  return imageData.data[sum*4]
}

function isLandByUV(c, f) {
  let n = parseInt(imageData.width * c) // 根据横纵百分比计算图象坐标系中的坐标
  o = parseInt(imageData.height * f) // 根据横纵百分比计算图象坐标系中的坐标
  return 1 >= imageData.data[4 * (o * imageData.width + n)] // 查找底图中对应像素点的rgba值并判断
}






const img = new Image()
let imageData = null
img.src = './earth.jpg'
img.onload = function(e){
  console.log(img.width,img.height)
  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = 600//img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img,0,0,img.width,img.height)
  imageData = ctx.getImageData(0,0,img.width,img.height)
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  var geometry = new THREE.BufferGeometry();
  var positions = [];
  var colors = [];


  const step = 250
  for (let i = 0; i < step; i++) {
      let vec = new THREE.Vector3()
      let radians = step * (1 - Math.sin(i / step * Math.PI)) / step + .5 // 每个纬线圈内的角度均分
      for (let j = 0; j < step; j += radians) {
          let c = j / step // 底图上的横向百分比
          let f = i / step // 底图上的纵向百分比
          if (isLandByUV(c, f)) { // 根据横纵百分比判断在底图中的像素值
            const vec3 = new THREE.Vector3()
            var color = new THREE.Color();
            vec3.setFromSpherical(new THREE.Spherical(1.5,f * Math.PI,c * Math.PI * 2 - Math.PI / 2))
            positions.push(vec3.x,vec3.y,vec3.z)
            color.setRGB(3/255,168/255,158/255);
            colors.push(color.r, color.g, color.b);
          }
      }
  }


  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  

  
  var material = new THREE.PointsMaterial({
    vertexColors:true,  // 颜色通过buffer传递进去
    size: 0.01,
    blending:THREE.AdditiveBlending,
    // depthWrite:false,
    transparent:true,
    // _min:.2 * Math.random() + .5,
    // delta_:.1 * Math.random() + .1,
    // opacity_coef_:1
  });
  var points = new THREE.Points(geometry, material);
  scene.add(points);
  
  camera.position.z = 3;
  
  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.006;
    renderer.render(scene, camera);
  }
  
  animate();
}

console.log(longlatiToXYZ(0,0))










