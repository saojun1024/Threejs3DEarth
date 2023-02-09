
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
export default class Threejs3DEarth {
    constructor(options){
        this.el = options.el
        this.width = options.width
        this.height = options.height
        this.backGround = options.backGround
        this.orbit = null
        this.renderer = null
        this.camera = null
        this.scene = new THREE.Scene()
        this.initAxesHelper()
        this.initLight()
        this.initObject()
        this.initCamera()
    }

    // 初始化坐标轴来辅助开发，正式环境可以去掉。
    initAxesHelper(){
        this.scene.add(new THREE.AxesHelper(250));
    }

    // 初始化光源
    initLight(){
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        this.scene.add(point); //点光源添加到场景中
        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        this.scene.add(ambient);
    }



    // 初始化相机
    initCamera(){
        var k = this.width / this.height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        this.camera.position.set(400, 300, 200); //设置相机位置
        this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)、
    }


    initObject(){
        //创建管道成型的路径(3D样条曲线)
        var path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-100, -50, -50),
            new THREE.Vector3(100, 50, 0),
            new THREE.Vector3(80, 50, 50),
            new THREE.Vector3(-50, 0, 100)
        ]);

        // path:路径   40：沿着轨迹细分数  20：管道半径   25：管道截面圆细分数
        var geometry = new THREE.TubeGeometry(path, 40, 20, 25);
        //材质对象
        var material = new THREE.LineBasicMaterial({
            color: 0x000000
        });
        //线条模型对象
        var line = new THREE.Line(geometry, material);
        this.scene.add(line); //线条对象添加到场景中
        const points = [];
        points.push( new THREE.Vector3( - 100, 50, 50 ) );
        points.push( new THREE.Vector3( 0, 100, 0 ) );
        points.push( new THREE.Vector3( 100, 0, 0 ) );
        const geometry2= new THREE.BufferGeometry().setFromPoints( points );
        const line2 = new THREE.Line( geometry2, material );
        this.scene.add(line2);
    }

    // 渲染到canvas上面
    render(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width,this.height);
        this.renderer.setClearColor(0xb9d3ff, 1);
        if(this.el){
            this.el.appendChild(this.renderer.domElement);
            this.orbit = new OrbitControls(this.camera,this.renderer.domElement)
        }
        this.updateRender()
    }

    // 更新渲染
    updateRender(){
        this.renderer.render(this.scene,this.camera);
    }
}