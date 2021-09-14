/**
 * @description 克隆 github/gitlab/bitbucket 上的项目模板至当前目录
 * @author Jeddy
 * @create 2021-09-13 22:28:41
 */

// 工具库
import download from 'download-git-repo';
import chalk from 'chalk';
import ora from 'ora';
import { npmlog } from '@addcn-cli/utils';

export const clone = (url: string, appName: string, options: any) => {
    console.log(url, appName, options, 'start clone');

    const spinner = ora(
        `${chalk.yellow('正在使用addcn-cli脚手架克隆远程仓库项目至本地')}`,
    );

    try {
        spinner.start();

        // 1. 检测当前的url
        const reg = new RegExp(
            /^(github|gitlab|bitbucket):([0-9a-z.]+)\/([0-9a-z.]+)/gi,
        );

        // 1.1 判断处理
        if (!reg.test(url)) {
            throw new Error(
                '请输入正确的<url>链接格式: (github|gitlab|bitbucket):owner/name',
            );
        }

        // 2. 开始克隆
        download(url, appName, (err) => {
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
                npmlog.success('success', `克隆完成，已克隆至${appName}目录下`);
            } catch (error) {
                npmlog.error('error', chalk.red(error.message));
            }
            // console.log(err ? 'Error' : 'Success', JSON.stringify(err));
        });
    } catch (error) {
        spinner.stop();
        npmlog.error('error', chalk.red(error.message));
    }
};
