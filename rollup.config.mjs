import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel';

export default {
    input: "./index.ts",
    output: [
        {
            file: "dist/index.js",
            format: 'es'
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        typescript({
            exclude:["**/*.stories.*"]
        }),
        postcss({
            extensions: ['.css']
        }),
        uglify(),
        babel()
    ]
}