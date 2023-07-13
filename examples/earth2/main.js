

function getPosColor(x,y){
  const sum = (imageData.width*y) - (imageData.width -x) - 1
  return imageData.data[sum*4]
}

function isLandByUV(c, f) {
  let n = parseInt(imageData.width * c) // 根据横纵百分比计算图象坐标系中的坐标
  o = parseInt(imageData.height * f) // 根据横纵百分比计算图象坐标系中的坐标
  return 0 === imageData.data[4 * (o * imageData.width + n)] // 查找底图中对应像素点的rgba值并判断
}






const img = new Image()
let imageData = null
img.src = './earth2.jpg'
img.onload = function(e){
  console.log(img.width,img.height)
  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
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


  // const count = 500
  // const d = Math.PI/count
  // for(let i=0;i<Math.PI;i+=d){
    
  //   const f = d*(1-Math.sin(i))+0.02
  //   for(let j=0;j<Math.PI*2;j+=f){
      
  //     const y = Math.ceil(i/d)
  //     const x = Math.ceil(j/f)
  //     const val = getPosColor(x+1,y+1)
  //     if(val === 1){
  //       const vec3 = new THREE.Vector3()
  //       vec3.setFromSpherical(new THREE.Spherical(1,i,j))
  //       positions.push(vec3.x,vec3.y,vec3.z)
  //       var color = new THREE.Color();
  //       color.setRGB(3/255,168/255,158/255);
  //       colors.push(color.r, color.g, color.b);
  //     }
  //   }
    
  // }
  // for(let y = 0;y<=500;y++){
  //   const r = y/(Math.PI/500)
  //   const devide = parseInt(Math.sin(r)/500)+1
  //   const step = 2*Math.PI/devide

  //   for(let x = 0;x<=2*Math.PI;x+=step){
  //     const c = x/(2*Math.PI)
  //     const f = y/500
  //     const bool = isLandByUV(c,f)
  //     const vec3 = new THREE.Vector3()
  //     var color = new THREE.Color();
  //     vec3.setFromSpherical(new THREE.Spherical(1,y*(Math.PI/500),x))
  //     positions.push(vec3.x,vec3.y,vec3.z)
  //     if(bool === true){
  //       color.setRGB(3/255,168/255,158/255);
  //       colors.push(color.r, color.g, color.b);
  //     }else{
  //       color.setRGB(0/255,0/255,255/255);
  //       colors.push(color.r, color.g, color.b);
  //     }
  //   }
  // }



  const step = 250
  for (let i = 0; i < step; i++) {
      let vec = new THREE.Vector3()
      let radians = step * (1 - Math.sin(i / step * Math.PI)) / step + .5 // 每个纬线圈内的角度均分
      for (let j = 0; j < step; j += radians) {
          let c = j / step // 底图上的横向百分比
          let f = i / step // 底图上的纵向百分比
          const vec3 = new THREE.Vector3()
          var color = new THREE.Color();
          vec3.setFromSpherical(new THREE.Spherical(1,f * Math.PI,c * Math.PI * 2 - Math.PI / 2))
          positions.push(vec3.x,vec3.y,vec3.z)
          if (isLandByUV(c, f)) { // 根据横纵百分比判断在底图中的像素值
              
              color.setRGB(3/255,168/255,158/255);
              colors.push(color.r, color.g, color.b);
          }
          else{
            color.setRGB(0/255,0/255,255/255);
            colors.push(color.r, color.g, color.b);
          }
      }
  }





  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  var material = new THREE.PointsMaterial({ vertexColors: true, size: 0.01,depthTest:false });
  
  var points = new THREE.Points(geometry, material);
  scene.add(points);
  
  camera.position.z = 3;
  
  function animate() {
    requestAnimationFrame(animate);
    //points.rotation.x += 0.001;
    points.rotation.y += 0.006;
    renderer.render(scene, camera);
  }
  
  animate();



}








