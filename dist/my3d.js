
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var My3D = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var My3D = /*#__PURE__*/function () {
    function My3D(options) {
      _classCallCheck(this, My3D);
      this.options = options;
      this.width = this.options.width;
      this.height = this.options.height;
      this.background = this.options.background;
      this.el = options.el;
      this.glContext = null;
      this.vertexShader = null;
      this.fragmentShader = null;
      this.program = null;
      this.vertexShaderSource = this.options.vertexShaderSource;
      this.fragmentShaderSource = this.options.fragmentShaderSource;
      this.initCanvas();
      this.createVertexShader();
      this.createFragmentShader();
      this.createProgram();
      this.useProgram();
    }
    _createClass(My3D, [{
      key: "initCanvas",
      value: function initCanvas() {
        var el = document.createElement("canvas");
        el.width = this.width;
        el.height = this.height;
        var dom = document.querySelector(this.el);
        dom.appendChild(el);
        this.glContext = el.getContext('webgl') || el.getContext('experimental-webgl');
      }

      // 创建顶点着色器
    }, {
      key: "createVertexShader",
      value: function createVertexShader() {
        this.vertexShader = this.glContext.createShader(this.glContext.VERTEX_SHADER);
        this.glContext.shaderSource(this.vertexShader, this.vertexShaderSource);
        this.glContext.compileShader(this.vertexShader);
        var success = this.glContext.getShaderParameter(this.vertexShader, this.glContext.COMPILE_STATUS);
        if (success) {
          return this.vertexShader;
        }
        console.error(this.glContext.getShaderInfoLog(this.vertexShader));
        this.glContext.deleteShader(this.vertexShader);
      }

      // 创建片元着色器
    }, {
      key: "createFragmentShader",
      value: function createFragmentShader() {
        this.fragmentShader = this.glContext.createShader(this.glContext.FRAGMENT_SHADER);
        this.glContext.shaderSource(this.fragmentShader, this.fragmentShaderSource);
        this.glContext.compileShader(this.fragmentShader);
        var success = this.glContext.getShaderParameter(this.fragmentShader, this.glContext.COMPILE_STATUS);
        if (success) {
          return this.fragmentShader;
        }
        console.error(this.glContext.getShaderInfoLog(this.fragmentShader));
        this.glContext.deleteShader(this.fragmentShader);
      }

      // 创建程序
    }, {
      key: "createProgram",
      value: function createProgram() {
        debugger;
        this.program = this.glContext.createProgram();
        this.glContext.attachShader(this.program, this.vertexShader);
        this.glContext.attachShader(this.program, this.fragmentShader);
        this.glContext.linkProgram(this.program);
        var success = this.glContext.getProgramParameter(this.program, this.glContext.LINK_STATUS);
        if (success) {
          return this.program;
        } else {
          console.error(this.glContext.getProgramInfoLog(this.program));
          this.glContext.deleteProgram(this.program);
          this.program = null;
        }
      }

      // 使用程序
    }, {
      key: "useProgram",
      value: function useProgram() {
        this.glContext.useProgram(this.program);
      }
    }, {
      key: "setVariable",
      value: function setVariable(obj) {
        var _this = this;
        Object.keys(obj).forEach(function (key) {
          var pointer = _this.glContext.getAttribLocation(_this.program, key);
          if (0 <= pointer) {
            // 大于等于0则获取地址成功，-1则失败
            if (Array.isArray(obj[key])) {
              if (obj[key].length === 2) {
                var _this$glContext;
                (_this$glContext = _this.glContext).vertexAttrib2f.apply(_this$glContext, [pointer].concat(_toConsumableArray(obj[key])));
              }
              if (obj[key].length === 3) {
                var _this$glContext2;
                (_this$glContext2 = _this.glContext).vertexAttrib3f.apply(_this$glContext2, [pointer].concat(_toConsumableArray(obj[key])));
              }
              if (obj[key].length === 4) {
                var _this$glContext3;
                (_this$glContext3 = _this.glContext).vertexAttrib4f.apply(_this$glContext3, [pointer].concat(_toConsumableArray(obj[key])));
              }
            }
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);
        this.glContext.drawArrays(this.glContext.POINTS, 0, 1);
      }
    }]);
    return My3D;
  }();

  return My3D;

})();
