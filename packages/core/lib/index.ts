/**
 * @description 脚手架入口文件
 * @author Jeddy
 * @create 2021-08-16 22:28:41
 */

// 工具库
// import { program } from 'commander';

import { npmlog, checkNodeVersion, checkPkgVersion } from '@addcn-cli/utils';
import packageConfig from '../package.json';

import CONST_CONFIG from './config';
const { LOWEST_NODE_VERSION } = CONST_CONFIG;

const cli = async () => {
    try {
        // 检查当前脚手架的版本，判断是否更新
        checkPkgVersion(packageConfig.version);

        // 检查当前运行的 node 版本
        checkNodeVersion(LOWEST_NODE_VERSION);

        // console.log(inquirer, 111);
    } catch (error) {
        console.log(error, 111);

        npmlog.error(error);
    }
};

export default cli;
