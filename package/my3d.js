

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
        this.program = null;
        this.vertexShaderSource = this.options.vertexShaderSource
        this.fragmentShaderSource = this.options.fragmentShaderSource
        this.initCanvas()
        this.createVertexShader()
        this.createFragmentShader()
        this.createProgram()
        this.useProgram()

    }

    initCanvas(){
        const el = document.createElement("canvas")
        el.width = this.width
        el.height = this.height
        const dom = document.querySelector(this.el)
        dom.appendChild(el)
        this.glContext = el.getContext('webgl') || el.getContext('experimental-webgl');
    }

    // 创建顶点着色器
    createVertexShader(){
        this.vertexShader = this.glContext.createShader(this.glContext.VERTEX_SHADER);
        this.glContext.shaderSource(this.vertexShader, this.vertexShaderSource);
        this.glContext.compileShader(this.vertexShader);
        let success = this.glContext.getShaderParameter(this.vertexShader, this.glContext.COMPILE_STATUS);
        if (success) {
            return this.vertexShader;
        }
        console.error(this.glContext.getShaderInfoLog(this.vertexShader));
        this.glContext.deleteShader(this.vertexShader);
    }

    // 创建片元着色器
    createFragmentShader(){
        this.fragmentShader = this.glContext.createShader(this.glContext.FRAGMENT_SHADER);
        this.glContext.shaderSource(this.fragmentShader, this.fragmentShaderSource);
        this.glContext.compileShader(this.fragmentShader);
        let success = this.glContext.getShaderParameter(this.fragmentShader, this.glContext.COMPILE_STATUS);
        if (success) {
            return this.fragmentShader;
        }
        console.error(this.glContext.getShaderInfoLog(this.fragmentShader));
        this.glContext.deleteShader(this.fragmentShader);
    }

    // 创建程序
    createProgram() {
        debugger
        this.program = this.glContext.createProgram();
        this.glContext.attachShader(this.program, this.vertexShader);
        this.glContext.attachShader(this.program, this.fragmentShader);
        this.glContext.linkProgram(this.program);
        let success = this.glContext.getProgramParameter(this.program, this.glContext.LINK_STATUS);
        if (success) {
            return this.program;
        } else {
            console.error(this.glContext.getProgramInfoLog(this.program));
            this.glContext.deleteProgram(this.program);
            this.program = null
        }
    }

    // 使用程序
    useProgram(){
        this.glContext.useProgram(this.program)
    }


    setVariable(obj){
        Object.keys(obj).forEach((key)=>{
            let pointer = this.glContext.getAttribLocation(this.program,key)
            if(0<=pointer){ // 大于等于0则获取地址成功，-1则失败
                if(Array.isArray(obj[key])){
                    if(obj[key].length === 2){
                        this.glContext.vertexAttrib2f(pointer,...obj[key])
                    }
                    if(obj[key].length === 3){
                        this.glContext.vertexAttrib3f(pointer,...obj[key])
                    }
                    if(obj[key].length === 4){
                        this.glContext.vertexAttrib4f(pointer,...obj[key])
                    }
                }
            }

        })
    }

    render(){
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);
        this.glContext.drawArrays(this.glContext.POINTS,0,1);
    }





    
    

}