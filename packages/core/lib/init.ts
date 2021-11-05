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

const fsPromises = fs.promises;

export const init = async () => {
    // 1. 检查本地缓存目录，是否存在该模板
    const isExists = fs.existsSync(TEMPLATE_PATH);

    // 2. 如果已经下载，则检查当前版本是否需要更新
    if (isExists) {
        const { isUpdate, currentVersion, latestVersion } =
            await checkPkgVersion('0.0.1', 'addcn-template');
        console.log(
            isUpdate,
            currentVersion,
            latestVersion,
            '开始检查版本是否需要更新',
        );
        // if (getVersion)
        // 显示提示消息，是否更新
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
            downloadTemplate();

            npmlog.info('info', 'addcn-template update successfully');
        }

        return;
    }

    // 3. 如果没有下载，则创建addcn_cli_templates目录
    await fsPromises.mkdir(TEMPLATE_PATH);

    // 4. 开始下载该模板至addcn_cli_templates目录
    downloadTemplate();
};

/**
 * 下载模板
 * @param root 根路径
 */
const downloadTemplate = () => {
    download('github:jeddygong/addcn-template#main', TEMPLATE_PATH, (err) => {
        spinner.start(`${chalk.yellow(`初始化模板中...`)}`);
        try {
            if (err) {
                throw new Error(
                    `克隆出错了，请确保：
1. 仓库名正确；
2. 仓库分支已存在（默认master，修改分支eg:(github|gitlab|bitbucket):owner/name#branch）`,
                );
            }

            // 开始克隆
            spinner.succeed(`${chalk.green(`初始化模板成功`)}`);
        } catch (error) {
            spinner.stop();
            npmlog.error('error', chalk.red(error));
        }
    });
};
