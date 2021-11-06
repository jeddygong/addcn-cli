/**
 * @description 自定义命令式
 * @author gongjin@addcn.com<10801>
 * @create 2021-11-05 20:30:18
 */

import child_process from 'child_process';

export default function (command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        child_process.exec(command, function (err, stdout) {
            // console.log(err, stdout, stderr);
            if (err) reject(err);
            resolve(stdout);
            // spinner.stop();
        });
    });
}
