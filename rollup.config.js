import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from "rollup-plugin-babel"
import serve from "rollup-plugin-serve"
import livereload from 'rollup-plugin-livereload'
export default {
    input:'package/my3d.js',
    output:{
        format:'iife',
        //name:'Threejs3DEarth',
        name:'My3D',
        dir:'dist'
    },
    plugins:[
        commonjs(),
        resolve(),
        babel({
            exclude: 'node_modules/**',
        }),
        livereload(),
        serve({
            open: true,
            openPage:'/examples/index.html',
            port: 8007
        })
    ]
}