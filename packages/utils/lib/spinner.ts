/**
 * @description 重新定义ora赋值
 * @author Jeddy
 * @create 2021-09-22 21:14:36
 */

import ora from 'ora';
// import chalk from 'chalk';

const spinner = ora();

spinner.spinner = {
    interval: 60,
    frames: ['|', '/', '-', '\\', '\\'],
};

export default spinner;
