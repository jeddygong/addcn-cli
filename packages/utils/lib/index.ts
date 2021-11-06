/**
 * @description 工具类库的入口
 * @author
 * @create 2021-08-16 22:26:21
 */

import npmlog from './npmlog';
import inquirer from './inquirer';
import spinner from './spinner';
import exec from './exec';
import {
    checkNodeVersion,
    checkPkgVersion,
    getInputArgs,
    getLatestVersion,
} from './utils';

const utils = () => {
    // TODO
    console.log('开始执行 util 包');
};

// 导出
export {
    utils,
    npmlog,
    inquirer,
    checkNodeVersion,
    checkPkgVersion,
    getInputArgs,
    getLatestVersion,
    spinner,
    exec,
};
