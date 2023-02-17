

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
        this.program = null
        this.vertexBuffer = null
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
        el.style.border = '1px solid #409eff'
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
        this.clear()
    }


    createBuffer(data){
        this.vertexBuffer = this.glContext.createBuffer()
        if(!this.vertexBuffer){
            console.error("缓冲区创建失败")
            return -1
        }
        // 将缓冲区对象绑定到 this.glContext.ARRAY_BUFFER 目标
        this.glContext.bindBuffer(this.glContext.ARRAY_BUFFER,this.vertexBuffer)
        // 像内存地址写入数据
        this.glContext.bufferData(this.glContext.ARRAY_BUFFER,data,this.glContext.STATIC_DRAW)

        // 获取到a_Position 的内存地址
        const a_Position = this.glContext.getAttribLocation(this.program,'a_Position')
        // 对内存指定划分规则
        // 内存地址，2个为一组，浮点数，是否将非浮点型数据归一化，组与组之间相隔数，从哪里开始
        this.glContext.vertexAttribPointer(a_Position,2,this.glContext.FLOAT,false,0,0)
        this.glContext.enableVertexAttribArray(a_Position)
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

    render(type){
        this.glContext.drawArrays(this.glContext.POINTS,0,3);
    }

    clear(){
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT)
    }





    
    

}