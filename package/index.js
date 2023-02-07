
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
export default class Threejs3DEarth {
    constructor(){
        this.version = "0.0.1"
        this.windowHeight = window.windowHeight
        this.windowWidth = window.windowWidth
        this.scene = new THREE.Scene()
    }

    init(){
        var scene = new THREE.Scene();
        //创建管道成型的路径(3D样条曲线)
        var path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-100, -50, -50),
        new THREE.Vector3(100, 50, 0),
        new THREE.Vector3(80, 50, 50),
        new THREE.Vector3(-50, 0, 100)
        ]);
        // path:路径   40：沿着轨迹细分数  20：管道半径   25：管道截面圆细分数
        var geometry = new THREE.TubeGeometry(path, 40, 20, 25);
        console.log(geometry);
        //材质对象
        var material = new THREE.LineBasicMaterial({
        color: 0x000000
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        scene.add(line); //线条对象添加到场景中
        
        const points = [];
        points.push( new THREE.Vector3( - 100, 50, 50 ) );
        points.push( new THREE.Vector3( 0, 100, 0 ) );
        points.push( new THREE.Vector3( 100, 0, 0 ) );

        const geometry2= new THREE.BufferGeometry().setFromPoints( points );

        const line2 = new THREE.Line( geometry2, material );
        scene.add( line2 );
            
            
        
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(400, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)、

        
        
        var axesHelper = new THREE.AxesHelper( 250 );
        scene.add( axesHelper );
        

        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
        //执行渲染操作   指定场景、相机作为参数
        //renderer.render(scene, camera);
        function render() {
            renderer.render(scene,camera);//执行渲染操作
        }
        render();
        var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
        controls.addEventListener('change', render);//监听鼠标、键盘事件
        }
}