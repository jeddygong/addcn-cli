/**
 * @description 脚手架入口文件
 * @author Jeddy
 * @create 2021-08-16 22:28:41
 */

// 工具库
// import { program } from 'commander';
import chalk from 'chalk';

import {
    npmlog,
    inquirer,
    checkNodeVersion,
    checkPkgVersion,
    getInputArgs,
} from '@addcn-cli/utils';
import pkgConfig from '../package.json';

import CONST_CONFIG from './config';
const { LOWEST_NODE_VERSION } = CONST_CONFIG;

const cli = async () => {
    try {
        // 检查当前脚手架的版本
        const bool = await localCheckPkgVersion();
        if (!bool) return;

        // 检查当前运行的 node 版本
        await checkNodeVersion(LOWEST_NODE_VERSION);

        // 获取当前所有参数
        const grgs = getInputArgs();
        console.log(grgs, 'grgs');

        // console.log(inquirer, 111);
    } catch (error) {
        // console.log(error, 111);

        npmlog.error('error', chalk.red(error.message));
    }
};

/**
 * 检查当前脚手架版本，提示是否更新
 * @returns Promise<boolean>
 */
const localCheckPkgVersion = async () => {
    const { isUpdate, currentVersion, latestVersion } = await checkPkgVersion(
        pkgConfig.version,
    );
    // console.log(isUpdate, 'result');
    if (!isUpdate) {
        npmlog.error(
            'error',
            chalk.red(
                `您当前的脚手架版本(${currentVersion})过低，建议您安装最新的版本(${latestVersion})`,
            ),
        );
        // 显示提示消息，是否更新
        const isUpdateCli = await inquirer({
            type: 'confirm',
            name: 'isUpdateCli',
            defaultValue: false,
            message: `是否更新addcn-cli脚手架最新版(${latestVersion}) ？`,
        });

        // console.log(isUpdateCli, 'isUpdateCli');
        if (isUpdateCli) npmlog.info('info', 'start update addcn-cli');

        return !isUpdateCli;
    }

    return true;
};

export default cli;
