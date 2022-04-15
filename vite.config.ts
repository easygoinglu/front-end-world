import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import postcssNested from 'postcss-nested';
import postcssVars from 'postcss-simple-vars';
import cssVariables from './src/common/configs/css-variables';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [vue()],
    css: {
        postcss: {
            plugins: [
                postcssNested,
                postcssVars({ 
                    variables: (cssVariables), 
                }),
            ],
        },
    },
});
