/**
 * @description 工具包声明文件
 * @author Jeddy
 * @create 2021-08-16 23:09:35
 */

// 相互之间引用的写法如下：这就代表这里依赖了npmlog.d.ts了
/// <reference path="./npmlog.d.ts"/>
// import npmlog from './../../packages/utils/node_modules/@types/npmlog';
interface IUtils {
    utils: () => void;
}

declare module '@addcn-cli/utils' {
    const utils: IUtils;
    // export default utils; 这样会报错
    // declare const utils: IUtils;
    export function utils(): void;

    export const npmlog: npmlog.Logger;
}
