
const VERTEX_SHADER_SOURCE = `



`

const FRAGMENT_SHADER_SOURCE  =``


export default class My3D{
    constructor(options){
        this.options = options
        this.width = this.options.width
        this.height = this.options.height
        this.background = this.options.background
        this.el = options.el
        this.glContext = null
        this.vertexShader = null
        this.fragmentShader = null
        this.initCanvas()
        this.createVertexShader()
        this.createFragmentShader()
        this.createProgram()
    }

    initCanvas(){
        const el = document.createElement("canvas")
        el.width = this.width
        el.height = this.height
        const dom = document.querySelector(this.el)
        dom.appendChild(el)
        this.glContext = el.getContext('webgl') || el.getContext('experimental-webgl');
    }


    createVertexShader(){
        this.vertexShader = this.glContext.createShader(this.glContext.VERTEX_SHADER);
        this.glContext.shaderSource(this.vertexShader, VERTEX_SHADER_SOURCE);
        this.glContext.compileShader(this.vertexShader);
        let success = this.glContext.getShaderParameter(this.vertexShader, this.glContext.COMPILE_STATUS);
        if (success) {
            return this.vertexShader;
        }
        console.error(this.glContext.getShaderInfoLog(this.vertexShader));
        this.glContext.deleteShader(this.vertexShader);
    }

    createFragmentShader(){
        this.fragmentShader = this.glContext.createShader(this.glContext.FRAGMENT_SHADER);
        this.glContext.shaderSource(this.fragmentShader, FRAGMENT_SHADER_SOURCE);
        this.glContext.compileShader(this.fragmentShader);
        let success = this.glContext.getShaderParameter(this.fragmentShader, this.glContext.COMPILE_STATUS);
        if (success) {
            return this.fragmentShader;
        }
        console.error(this.glContext.getShaderInfoLog(this.fragmentShader));
        this.glContext.deleteShader(this.fragmentShader);
    }


    
    createProgram() {
        let program = this.glContext.createProgram();
        this.glContext.attachShader(program, this.vertexShader);
        this.glContext.attachShader(program, this.fragmentShader);
        this.glContext.linkProgram(program);
        let success = this.glContext.getProgramParameter(program, this.glContext.LINK_STATUS);
        if (success) {
            return program;
        }
        console.error(this.glContext.getProgramInfoLog(program));
        this.glContext.deleteProgram(program);
        this.glContext.useProgram(program);
    }
    
    

}