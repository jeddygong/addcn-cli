/**
 * @description 工具包声明文件
 * @author Jeddy
 * @create 2021-08-16 23:09:35
 */

interface IUtils {
    utils: () => void;
}

declare module '@addcn-cli/utils' {
    const utils: IUtils;
    // export default utils; 这样会报错
    export = utils;
}
