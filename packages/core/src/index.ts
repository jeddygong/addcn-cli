/**
 * @description 脚手架入口文件
 * @author Jeddy
 * @create 2021-08-16 22:28:41
 */

// 工具库
import path from 'path';
import { program } from 'commander';
import chalk from 'chalk';
import {
    npmlog,
    inquirer,
    checkNodeVersion,
    checkPkgVersion,
    getInputArgs,
    spinner,
    exec,
} from '@addcn-cli/utils';

// 方法引入
import { clone } from './clone';
import { init } from './init';
import { create } from './create';
import { LOWEST_NODE_VERSION } from './config';

const pkgPath = path.join(__dirname, '../../package.json');
const pkgConfig = require(pkgPath);

async function cli() {
    spinner.text = `${chalk.yellow('欢迎使用数睿科技addcn-cli脚手架')}`;

    try {
        // 1.检查当前脚手架的版本
        const bool = await localCheckPkgVersion();

        spinner.clear();

        if (!bool) return;

        // 2.检查当前运行的 node 版本
        checkNodeVersion(LOWEST_NODE_VERSION);

        // 3.获取当前所有参数
        getInputArgs();
        // const grgs = getInputArgs();

        // 4.注册命令
        registerCommand();

        // 停止ora
        spinner.stop();
    } catch (error) {
        spinner.stop();
        npmlog.error('error', chalk.red(error));
        getHelpDocument();
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
            await init();
            spinner.succeed('初始化完成');
        });

    // 创建项目命令
    program
        .command('create <app-name> [options]')
        .description('创建一个新项目')
        .option('-f, --force', '强制更新所有缓存信息')
        .action(async (appName) => {
            // 1. 检查模板是不是最新版本的
            await init();
            // 2. 开始创建
            await create({ appName });
        });

    // 下载远程仓库至本地，这个可以放在下一个版本迭代
    program
        .command('install <url> [options]')
        .description('安装一个自定义「模板插件包」到当前脚手架模板目录') // 把这个模板插件包下载到硬盘
        .option('-f, --force', '强制更新所有缓存信息')
        .action(async () => {
            npmlog.warn('warn', `${chalk.red('请确保当前模板已存在！！！')}`);
        });

    // 克隆仓库中的项目
    program
        .command('clone <url> <app-name> [options]')
        .description('克隆github/gitlab上的某个仓库项目至本地')
        .option('-f, --force', '强制更新所有缓存信息')
        .action(async (url, appName, options) => {
            await clone({ url, appName, options });
        });

    // 发布项目
    program
        .command('publish <url> [options]')
        .description('部署项目到对应的服务器上')
        .option('-f, --force', '强制更新所有缓存信息')
        .action(async () => {
            npmlog.warn(
                'warn',
                `${chalk.red('服务器地址连接错误，请稍后再试！！！')}`,
            );
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
    // program.outputHelp();
};

/**
 * 检查当前脚手架版本，提示是否更新
 * @returns Promise<boolean>
 */
const localCheckPkgVersion = async (): Promise<boolean | undefined> => {
    try {
        const { isUpdate, currentVersion, latestVersion } =
            await checkPkgVersion(pkgConfig.version, pkgConfig.name);

        npmlog.notice('addcn-cli version:', currentVersion);

        if (!isUpdate) return true;

        npmlog.warn(
            'warn',
            chalk.red(
                `您当前的脚手架版本(v${currentVersion})过低，建议您更新最新的版本(v${latestVersion})`,
            ),
        );
        // 显示提示消息，是否更新
        const isUpdateCli = (await inquirer({
            type: 'confirm',
            name: 'isUpdateCli',
            defaultValue: true,
            message: `是否更新addcn-cli脚手架最新版本(v${latestVersion}) ？`,
        })) as boolean;

        if (isUpdateCli) {
            spinner.start(`${chalk.yellow(`正在更新脚手架，请稍等...`)}`);
            await exec('npm install -g @addcn-cli/core@latest');
            spinner.succeed(`${chalk.green(`addcn-cli update successfully`)}`);
        }

        return !isUpdateCli;
    } catch (error) {
        spinner.stop();
        npmlog.error('error', chalk.red(error));
    }
};

export default cli;
