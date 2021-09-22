/**
 * @description 脚手架入口文件
 * @author Jeddy
 * @create 2021-08-16 22:28:41
 */

// 工具库
import { program } from 'commander';
import chalk from 'chalk';
import {
    npmlog,
    inquirer,
    checkNodeVersion,
    checkPkgVersion,
    getInputArgs,
    spinner,
} from '@addcn-cli/utils';

// 方法引入
import { clone } from './clone';
import pkgConfig from '../package.json';

import CONST_CONFIG from './config';
const { LOWEST_NODE_VERSION } = CONST_CONFIG;

async function cli() {
    // spinner.indent = 2;
    spinner.spinner = {
        interval: 60,
        frames: ['|', '/', '-', '\\', '\\'],
    };
    try {
        // 检查当前脚手架的版本
        const bool = await localCheckPkgVersion();

        // spinner.text = '';
        spinner.succeed();

        if (!bool) return;

        // 检查当前运行的 node 版本
        checkNodeVersion(LOWEST_NODE_VERSION);

        // 获取当前所有参数
        const grgs = getInputArgs();
        console.log(grgs, 'grgs');

        // 注册命令
        registerCommand();

        // 停止ora
        spinner.stop();
    } catch (error) {
        console.log(error, 111);
        spinner.stop();
        npmlog.error('error', chalk.red(error.message));
    }
}

/**
 * 开始注册命令
 */
const registerCommand = () => {
    // 重载错误输出
    // program.exitOverride();

    // 初始化帮助信息
    getHelpDocument();

    // 初始化命令
    program
        .command('init')
        .description('初始化脚手架')
        .action(async () => {
            npmlog.success('success', '初始化完成');
        });

    // 创建项目命令
    program
        .command('create <app-name>')
        .description('创建一个新项目')
        .option('-f, --force', '强制更新所有缓存信息')
        .action(async () => {
            npmlog.success('success', '创建一个新项目完成');
        });

    // 下载远程仓库至本地
    program
        .command('inistall <url>')
        .description('安装一个「模板插件包」到当前脚手架') // 把这个模板插件包下载到硬盘
        .option('-f, --force', '强制更新所有缓存信息')
        .action(async () => {
            npmlog.success('success', '安装一个「模板插件包」到当前脚手架完成');
        });

    // 克隆仓库中的项目
    program
        .command('clone <url> <app-name> [options]')
        .description('克隆github/gitlab上的项目模板至当前目录')
        .option('-f, --force', '强制更新所有缓存信息')
        .action(async (url, appName, options) => {
            clone(url, appName, options);
        });

    // 使program返回的错误信息是空
    // program.configureOutput({
    //     // 输出错误“”.
    //     outputError: () => '',
    // });

    // 注册所有命令
    program.parse(process.argv);
    spinner.stop();
};

/**
 * 获取脚手架帮助信息
 */
const getHelpDocument = () => {
    program
        .name(Object.keys(pkgConfig.bin)[0])

        // 展示脚手架版本
        .version(pkgConfig.version, '-v, --version', '输出版本号')

        // 修改帮助展示信息
        .helpOption('-h, --help', '展示帮助文档')

        // 关闭子命令的 help
        .addHelpCommand(false)

        // 展示主命令规则
        .usage('<command> [options] 数睿科技脚手架使用规则');

    // 在结尾自定义帮助文档
    program.addHelpText(
        'afterAll',
        `
  Run ${chalk.green(
      'addcn-cli <command> --help',
  )} for detailed usage of given command
  `,
    );

    // 没有命令的时候，输出帮助文档
    program.outputHelp();
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
