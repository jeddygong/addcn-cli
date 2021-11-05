/**
 * @description 初始化项目模板至当前环境目录
 * @author Jeddy
 * @create 2021-10-28 22:28:41
 */

import fs from 'fs';
import chalk from 'chalk';
import download from 'download-git-repo';
import fse from 'fs-extra';
import { TEMPLATE_PATH } from './config';
import { npmlog, spinner, inquirer, checkPkgVersion } from '@addcn-cli/utils';

export const init = async () => {
    // 1. 检查本地缓存目录，是否存在该模板
    const isExists = fs.existsSync(TEMPLATE_PATH);

    // 2. 如果已经下载，则检查当前版本是否需要更新
    if (isExists) {
        // 获取模板本地配置
        const tmplPkg = require(`${TEMPLATE_PATH}/package.json`);

        const { isUpdate, latestVersion } = await checkPkgVersion(
            tmplPkg.version,
            'addcn-template',
        );

        // 判断是否更新
        if (!isUpdate) return;

        const isUpdateTemp = await inquirer({
            type: 'confirm',
            name: 'isUpdateTemp',
            defaultValue: false,
            message: `是否更新脚手架模板最新版本(${latestVersion}) ？`,
        });

        if (isUpdateTemp) {
            // 删除目录下的子文件
            await fse.emptyDir(TEMPLATE_PATH);

            // 删除目录
            fs.rmdirSync(TEMPLATE_PATH);

            // 开始下载最新的模板
            downloadTemplate(`update`);
        }

        return;
    }

    // 3. 开始下载该模板至addcn_cli_templates目录
    downloadTemplate(`init`);
};

/**
 * 下载模板
 * @param {string} text 提示
 * @return void
 */
const downloadTemplate = (text: string): void => {
    spinner.start(`${chalk.yellow(`${text} template...`)}`);
    download('github:jeddygong/addcn-template#main', TEMPLATE_PATH, (err) => {
        try {
            if (err) {
                throw new Error(
                    `克隆出错了，请确保：
1. 仓库名正确；
2. 仓库分支已存在（默认master，修改分支eg:(github|gitlab|bitbucket):owner/name#branch）`,
                );
            }

            // 开始克隆
            spinner.succeed(`${chalk.green(`template ${text} successfully`)}`);
        } catch (error) {
            spinner.stop();
            npmlog.error('error', chalk.red(error));
        }
    });
};
