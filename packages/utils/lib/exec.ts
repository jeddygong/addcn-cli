/**
 * @description 自定义命令式
 * @author gongjin@addcn.com<10801>
 * @create 2021-11-05 20:30:18
 */

import child_process from 'child_process';

// interface IOptions {
//     cwd?: string;
//     env?: string;
//     encoding?: string;
//     shell?: string;
//     signal?: string;
//     timeout?: number;
//     maxBuffer?: number;
//     killSignal?: string;
//     uid?: number;
//     gid?: number;
//     windowsHide?: boolean;
// }

export default function (
    command: string,
    options: child_process.ExecOptions,
): Promise<string> {
    return new Promise((resolve, reject) => {
        child_process.exec(command, options, function (err, stdout) {
            // console.log(err, stdout, stderr);
            if (err) reject(err);
            resolve(stdout);
            // spinner.stop();
        });
    });
}
