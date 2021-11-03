/**
 * @description 初始化项目模板至当前环境目录
 * @author Jeddy
 * @create 2021-10-28 22:28:41
 */

import { homedir } from 'os'; // 兼容性
import fs from 'fs';
// import child_process from 'child_process';
import chalk from 'chalk';
import download from 'download-git-repo';
import fse from 'fs-extra';
import { npmlog, spinner, inquirer, checkPkgVersion } from '@addcn-cli/utils';

const fsPromises = fs.promises;

export const init = async () => {
    // 获取跟路径
    const root = homedir();
    // 1. 检查本地缓存目录，是否存在该模板
    const isExists = fs.existsSync(`${root}/.addcn_cli_templates`);

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
            message: `是否更新addcn-cli脚手架最新版(${latestVersion}) ？`,
        });

        if (isUpdateTemp) {
            // 删除目录下的子文件
            await fse.emptyDir(`${root}/.addcn_cli_templates`);
            // 删除目录
            fs.rmdirSync(`${root}/.addcn_cli_templates`);

            // 开始下载最新的模板
            downloadTemplate(root);

            npmlog.info('info', 'addcn-template update successfully');
        }

        return;
    }

    // 3. 如果没有下载，则创建addcn_cli_templates目录
    await fsPromises.mkdir(`${root}/.addcn_cli_templates`);

    // 4. 开始下载该模板至addcn_cli_templates目录
    downloadTemplate(root);
};

/**
 * 下载模板
 * @param root 根路径
 */
const downloadTemplate = (root: string) => {
    // 1. 删除清空目录文件

    // 2. 开始下载
    download(
        'github:jeddygong/addcn-template#main',
        `${root}/.addcn_cli_templates`,
        (err) => {
            spinner.stop();
            try {
                if (err) {
                    throw new Error(
                        `克隆出错了，请确保：
1. 仓库名正确；
2. 仓库分支已存在（默认master，修改分支eg:(github|gitlab|bitbucket):owner/name#branch）`,
                    );
                }

                // 开始克隆
                npmlog.success('success', `克隆完成，已克隆至appName目录下`);
            } catch (error) {
                npmlog.error('error', chalk.red(error));
            }
            // console.log(err ? 'Error' : 'Success', JSON.stringify(err));
        },
    );
};
