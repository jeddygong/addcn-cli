/**
 * @description 克隆 github/gitlab/bitbucket 上的项目模板至当前目录
 * @author Jeddy
 * @create 2021-09-13 22:28:41
 */

// 工具库
import download from 'download-git-repo';
import chalk from 'chalk';
import { npmlog, spinner } from '@addcn-cli/utils';

export interface ICloneParams {
    url: string;
    appName: string;
    options: any;
}

export const clone = ({ url, appName, options }: ICloneParams) => {
    npmlog.info('info', `${url}--${appName}--${options} start create project`);

    try {
        spinner.start(`${chalk.yellow(`准备克隆`)}`);

        // 1. 检测当前的url
        const reg = new RegExp(
            /^(github|gitlab|bitbucket):([0-9a-z.]+)\/([0-9a-z.]+)/gi,
        );

        // 1.1 判断处理
        if (!reg.test(url)) {
            throw new Error(
                '请输入正确的<url>链接格式: (github|gitlab|bitbucket):owner/name#branch',
            );
        }

        // 2. 开始克隆
        download(url, appName, (err) => {
            spinner.start(`${chalk.yellow(`正在克隆中......`)}`);
            try {
                if (err) {
                    throw new Error(
                        `克隆出错了，请确保：
1. 请确保仓库名正确；
2. 请确保仓库分支已存在（默认master，修改分支eg:(github|gitlab|bitbucket):owner/name#branch）`,
                    );
                }
                spinner.succeed(
                    `${chalk.green(`克隆成功，已克隆至${appName}目录下`)}`,
                );
            } catch (error) {
                spinner.stop();
                npmlog.error('error', chalk.red(error));
            }
        });
    } catch (error) {
        spinner.stop();
        npmlog.error('error', chalk.red(error));
    }
};
