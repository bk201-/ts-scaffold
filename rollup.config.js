import commonJS from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typeScript from '@rollup/plugin-typescript';
import autoExternal from 'rollup-plugin-auto-external';
import globals from 'rollup-plugin-node-globals';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default (async () => ({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: isProduction ? false : 'inline',
    },
  ],
  plugins: [
    autoExternal({
      builtins: true,
      dependencies: true,
      peerDependencies: true,
    }),
    nodeResolve({
      browser: false,
      preferBuiltins: true,
    }),
    typeScript({
      tsconfig: 'tsconfig.json',
      module: 'CommonJS',
    }),
    commonJS({
      extensions: ['.js', '.ts'],
    }),
    globals(),
    json(),
    sourceMaps(),
    isProduction && terser(),
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
  },
}))();
