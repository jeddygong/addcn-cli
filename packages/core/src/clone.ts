/**
 * @description 克隆 github/gitlab/bitbucket 上的项目模板至当前目录
 * @author Jeddy
 * @create 2021-09-13 22:28:41
 */

// 工具库
import chalk from 'chalk';
import { npmlog, spinner, download } from '@addcn-cli/utils';

export interface ICloneParams {
    url: string;
    appName: string;
    options?: any;
}

export const clone = async ({ url, appName }: ICloneParams): Promise<void> => {
    spinner.stop();
    try {
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
        spinner.start(`${chalk.yellow(`正在克隆中......`)}`);
        await download(url, appName);
        spinner.succeed(`${chalk.green(`克隆成功，已克隆至${appName}目录下`)}`);
    } catch (error) {
        spinner.stop();
        npmlog.error('error', chalk.red(error));
    }
};
