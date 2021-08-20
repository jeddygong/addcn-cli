/**
 * 根据接受的参数，导出模板地址
 */

import path from 'path';

const cli = async (type: string) => {
    switch (type) {
        case 'vue2':
            type = 'vue2';
            break;
        case 'vue3':
            type = 'vue3';
            break;
        case 'vite-vue3':
            type = 'vite-vue3';
            break;
        case 'vite-vue3-ts':
            type = 'vite-vue3-ts';
            break;
        case 'react':
            type = 'react-demo';
            break;
        case 'koa2':
            type = 'koa2';
            break;
        case 'express':
            type = 'express';
            break;

        default:
            break;
    }

    const pathTemp = path.join(__dirname, `./../templates/${type}`);

    console.log(type, pathTemp, '导出路径参数');
    return pathTemp;
};

export default cli;
