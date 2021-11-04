/**
 * @description 创建项目
 * @author Jeddy
 * @create 2021-11-03 22:28:41
 */

import chalk from 'chalk';
import fse from 'fs-extra';
import { TEMPLATE_PATH } from './config';
import { npmlog, inquirer, spinner } from '@addcn-cli/utils';

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
    const answers = (await inquirer(tmplList)) as string;

    spinner.start(`${chalk.yellow(`正在创建${answers}模板项目`)}`);
    // 模板下载
    switch (answers) {
        case 'vue2':
            // 复制缓存模板中的vue2模板
            await fse.copySync(
                `${TEMPLATE_PATH}/templates/${answers}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'vue3':
            // 复制缓存模板中的vue3模板
            await fse.copySync(
                `${TEMPLATE_PATH}/templates/${answers}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'vite-vue3':
            // 复制缓存模板中的vite-vue3模板
            await fse.copySync(
                `${TEMPLATE_PATH}/templates/${answers}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'vite-vue3-ts':
            // 复制缓存模板中的vite-vue3-ts模板
            await fse.copySync(
                `${TEMPLATE_PATH}/templates/${answers}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'react':
            // 复制缓存模板中的react模板
            await fse.copySync(
                `${TEMPLATE_PATH}/templates/${answers}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'koa2':
            // 复制缓存模板中的koa2模板
            await fse.copySync(
                `${TEMPLATE_PATH}/templates/${answers}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
        case 'express':
            // 复制缓存模板中的express模板
            await fse.copySync(
                `${TEMPLATE_PATH}/templates/${answers}`,
                `./${appName}`,
            );
            spinner.succeed(`${chalk.yellow('创建成功')}`);
            break;
    }
};
