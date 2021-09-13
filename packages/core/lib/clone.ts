/**
 * @description 克隆 github/gitlab/bitbucket 上的项目模板至当前目录
 * @author Jeddy
 * @create 2021-09-13 22:28:41
 */

// 工具库
import download from 'download-git-repo';

import { npmlog } from '@addcn-cli/utils';

export const clone = (url: string, appName: string, options: any) => {
    console.log(url, appName, options, 'start clone');

    // 1. 检查当前的url
    try {
        // if (!url) throw new Error(`需要克隆的url不能为空`);

        // if (!appName) throw new Error(`文件名不能为空`);

        console.log(download, 'download');
        download('github:jeddygong/vite-vue-template', appName, (err) => {
            if (err) {
                // spinner.fail(chalk.red(`下载出错了：${err.message}`));
            } else {
                // spinner.succeed(
                //     `下载已完成，模板已下载至${chalk.yellow(
                //         'test/vue-tmp',
                //     )}目录下`,
                // );
            }
            console.log(err ? 'Error' : 'Success', JSON.stringify(err));
        });
    } catch (error) {
        npmlog.error('error', 'url链接格式有误');
    }

    npmlog.success('success', '克隆github/gitlab上的项目模板');
};
