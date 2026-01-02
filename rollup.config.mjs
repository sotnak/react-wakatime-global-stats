import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel';

export default {
  input: "./index.ts",
  output: [
    { file: "dist/index.js", format: 'es' }
  ],
  external: [
    "react",
    "react-dom",
    "react-bootstrap",
    "swr",
    "axios"
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ preferBuiltins: false }),
    typescript({ exclude: ["__fixtures__/**", "assets/**"] }),
    postcss({ extensions: ['.css'] }),
    uglify(),
    babel({ exclude: 'node_modules/**' }),
  ]
}
