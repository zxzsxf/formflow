import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "@rollup/plugin-node-resolve";

export default [
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].cjs.js",
    },
    plugins: [
      nodePolyfills({ preferBuiltins: true }),
      commonjs(),
      typescript(),
      json(),
    ],
    external: [/react\//],
  },
];
