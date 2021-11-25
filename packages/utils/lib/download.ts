/**
 * @description 下载远程github/gitlab/bitbucket仓库代码
 * @author gongjin@addcn.com<10801>
 * @create 2021-11-05 20:30:18
 */

import downloads from 'download-git-repo';

/**
 *
 * @param {string} url 需要下载的远程仓库地址
 * @param {string} appName 需要下载到本地的目录名称
 * @returns {Promise<string>}
 */
export default function (url: string, appName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        downloads(url, appName, (err: any) => {
            if (err)
                reject(
                    `克隆出错了，请确保：
1. 仓库名正确；
2. 仓库分支已存在（默认master，修改分支eg:(github|gitlab|bitbucket):owner/name#branch）`,
                );

            resolve(`install successfully`);
        });
    });
}
