import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const enableSourceMap = false
export default [
    {
        input: 'src/mathlive.js',
        plugins: [
            terser({
                sourcemap: enableSourceMap,
                compress: {
                drop_console: !enableSourceMap,
                drop_debugger: !enableSourceMap,
                    ecma: 8,
                    module: true,
                    warnings: true,
                    passes: 2,
                },
            }),
            copy({
                targets: [
                    { src: 'css/fonts', dest: 'dist' },
                    { src: 'src', dest: 'dist' },
                    {
                        src: 'build/types.d.ts',
                        dest: 'dist',
                        rename: 'mathlive.d.ts',
                    },
                ],
            }),
        ],
        output: [
            {
                // JavaScript native module
                sourcemap: enableSourceMap,
                file: 'dist/mathlive.mjs',
                format: 'es',
            },
            {
                // UMD file, suitable for <script>, require(), etc...
                sourcemap: enableSourceMap,
                file: 'dist/mathlive.js',
                format: 'umd',
                name: 'MathLive',
            },
        ],
    },
    {
        input: 'src/vue-mathlive.js',
        plugins: [
            terser({
                sourcemap: enableSourceMap,
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    ecma: 6,
                    module: true,
                    warnings: true,
                },
            }),
        ],
        output: {
            // JavaScript native module
            sourcemap: enableSourceMap,
            file: 'dist/vue-mathlive.mjs',
            format: 'es',
        },
    },
];