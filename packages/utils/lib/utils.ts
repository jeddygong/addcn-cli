/**
 * @description 常用的工具类
 * @author Jeddy
 * @create 2021-08-31 20:36:22
 */

// 工具库
import semver from 'semver';
import minimist from 'minimist';
// import chalk from 'chalk';
// import shell from 'shelljs';
import child_process from 'child_process';

import npmlog from './npmlog';

/**
 * 获取当前包的线上的latest版本
 * 查看npm仓库中某个项目的版本：https://www.cnblogs.com/zhizou/p/14550818.html
 * @param pkgName 获取版本的包名 name
 * @returns Promise<string>
 */
export const getLatestVersion = (pkgName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // 通过命令 npm info jquery 获取线上的最新版本信息
        // shell.exec('npm version @my-cli-ts/core');
        child_process.exec(
            `npm view ${pkgName} version`,
            function (err, stdout, stderr) {
                // console.log(err, stdout, stderr);
                if (err) reject(stderr);
                resolve(stdout);
            },
        );
    });
};

/**
 * 检查当前 node 版本是否合格
 * @param version 当前需要比较的版本
 */
export const checkNodeVersion = (version: string) => {
    // console.log('当前 node version：' + process.version);
    // console.log('支持的 node version：' + version);

    if (!semver.gte(process.version, version)) {
        throw new Error(
            `您的 Node.js 版本过低，addcn-cli 需要安装 v${version} 以上版本的 Node.js`,
        );
        // throw npmlog.error(
        //     'error',
        //     chalk.red(
        //         `您的 node.js 版本过低，addcn-cli需要安装 v${version} 以上版本的 Node.js`,
        //     ),
        // );
    }
};

/**
 * 检查当前的 package 包版本大小
 * @param version 当前 package 包的版本
 */
export const checkPkgVersion = async (version: string) => {
    // 1. 获取线上的最新包的版本号
    const latestVersion = await getLatestVersion('@addcn-cli/core');

    // 2. 对比一下当前包的版本是否小于线上版本
    if (!semver.gte(version, latestVersion)) {
        // throw npmlog.error(
        //     'error',
        //     chalk.red(`您当前的脚手架版本过低，建议您安装最新的版本`),
        // );
        // throw new Error(`您当前的脚手架版本过低，建议您安装最新的版本`);

        // log.warn(colors.yellow(`请手动更新 ${NPM_NAME}，当前版本：${packageConfig.version}，最新版本：${lastVersion}
        //         更新命令： npm install -g ${NPM_NAME}`));

        return {
            isUpdate: false,
            currentVersion: version,
            latestVersion: latestVersion.trim(),
        };
    }

    // 2. 提示日志输出
    npmlog.notice('addcn-cli', version);
    npmlog.success('欢迎使用数睿科技addcn-cli脚手架');

    return {
        isUpdate: true,
        currentVersion: version,
        latestVersion: latestVersion.trim(),
    };
};

/**
 * 检查输入的参数
 */
export const getInputArgs = () => {
    const args = minimist(process.argv.slice(2));
    // console.log(args);

    return args;
};
