/**
 * @description 重新定义ora赋值
 * @author Jeddy
 * @create 2021-09-22 21:14:36
 */

import ora from 'ora';
import chalk from 'chalk';

const spinner = ora(
    `${chalk.yellow('正在使用addcn-cli脚手架克隆远程仓库项目至本地')}`,
);

export default spinner;
