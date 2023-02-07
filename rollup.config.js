import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input:'package/index.js',
    output:{
        format:'esm',
        name:'3DEarth',
        dir:'dist'
    },
    plugins:[
        commonjs(),
        resolve()
    ]
}