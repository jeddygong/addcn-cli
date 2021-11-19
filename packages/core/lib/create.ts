/**
 * @description 创建项目
 * @author Jeddy
 * @create 2021-11-03 22:28:41
 */

import chalk from 'chalk';
import fse from 'fs-extra';
import { TEMPLATE_PATH } from './config';
import { npmlog, inquirer, spinner } from '@addcn-cli/utils';
import {
    addTypescriptExtend,
    addPrettierExtend,
    addCZAndHuskyExtend,
} from './createExtend';

export interface ICreateParams {
    appName: string;
}

export const create = async ({ appName }: ICreateParams) => {
    npmlog.info('info', `${appName} start create project`);

    // 1. 获取缓存中已存在的模板
    const tmpls = [
        { value: 'vue2', name: 'vue2' },
        { value: 'vue3', name: 'vue3' },
        { value: 'vite-vue3', name: 'vite + vue3' },
        { value: 'vite-vue3-ts', name: 'vite + vue3 + ts' },
        { value: 'react', name: 'react' },
        { value: 'koa2', name: 'koa2' },
        { value: 'express', name: 'express' },
    ];

    // 2.选择所需的模板（控制台交互）
    const tmplList = {
        type: 'list', // rowlist， 会多一个序号和answer
        name: 'listType',
        message: '请选择您要创建的项目类型？',
        // default: 1,
        choices: tmpls,
    };
    const typeValue = (await inquirer(tmplList)) as string;

    // spinner.start(`${chalk.yellow(`正在创建${typeValue}模板项目`)}`);
    // 模板下载
    switch (typeValue) {
        case 'vue2':
            // eslint-disable-next-line no-case-declarations
            const nowExtend = await getExtendType();

            // console.log(nowExtend, 'nowExtend');
            spinner.start(`${chalk.yellow(`正在创建${typeValue}模板项目`)}`);

            // 复制缓存模板中的vue2模板
            await fse.copy(
                `${TEMPLATE_PATH}/templates/${typeValue}`,
                `./${appName}`,
            );

            // 添加对应的插件至模板中
            await addExtendToProject(nowExtend, appName);

            // spinner.clear();
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'vue3':
            // 复制缓存模板中的vue3模板
            await fse.copy(
                `${TEMPLATE_PATH}/templates/${typeValue}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'vite-vue3':
            // 复制缓存模板中的vite-vue3模板
            await fse.copy(
                `${TEMPLATE_PATH}/templates/${typeValue}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'vite-vue3-ts':
            // 复制缓存模板中的vite-vue3-ts模板
            await fse.copy(
                `${TEMPLATE_PATH}/templates/${typeValue}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'react':
            // 复制缓存模板中的react模板
            await fse.copy(
                `${TEMPLATE_PATH}/templates/${typeValue}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'koa2':
            // 复制缓存模板中的koa2模板
            await fse.copy(
                `${TEMPLATE_PATH}/templates/${typeValue}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'express':
            // 复制缓存模板中的express模板
            await fse.copy(
                `${TEMPLATE_PATH}/templates/${typeValue}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
    }
};

const getExtendType = async (): Promise<Array<string>> => {
    // 扩展插件
    const tmplExtend = {
        type: 'checkbox', // rowlist， 会多一个序号和answer
        name: 'extendArray',
        message: '[多选]是否需要添加以下配置？',
        // default: 'eslint', // 默认选中 eslint
        choices: [
            // { value: 'eslint', name: 'eslint' },
            { value: 'typescript', name: 'typescript' },
            { value: 'prettier', name: 'prettier' },
            {
                value: 'commitizen',
                name: 'commitizen + husky(规范 git 提交)',
            },
        ],
    };
    const extendArray = await inquirer(tmplExtend);

    // console.log(extendArray, 'checkboxs');
    return extendArray;
};

const addExtendToProject = async (
    nowExtend: Array<string> | string,
    url: string,
) => {
    // console.log(nowExtend, url, 'addExtendToProject');
    if (nowExtend.includes('typescript')) {
        await addTypescriptExtend(url);
    }
    if (nowExtend.includes('prettier')) {
        await addPrettierExtend(url);
    }
    if (nowExtend.includes('commitizen')) {
        await addCZAndHuskyExtend(url);
    }
};
