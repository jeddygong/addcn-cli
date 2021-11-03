/**
 * @description 工具包声明文件
 * @author Jeddy
 * @create 2021-08-16 23:09:35
 */

// 相互之间引用的写法如下：这就代表这里依赖了npmlog.d.ts了
/// <reference path="./npmlog.d.ts"/>
/// <reference path="./../../packages/utils/node_modules/@types/inquirer/index.d.ts"/>
/// <reference path="./../../packages/utils/node_modules/ora/index.d.ts"/>
interface IUtils {
    utils: () => void;
}

// inquirer 参数定义

declare module '@addcn-cli/utils' {
    const utils: IUtils;
    // export default utils; 这样会报错
    // declare const utils: IUtils;
    export function utils(): void;

    export const npmlog: npmlog.Logger;

    interface IParameters {
        type: string;
        name?: string;
        choices?: { name:string, value:string }[];
        default?: string | number | undefined | null;
        defaultValue?: string | number | undefined | null | boolean;
        message: string;
        require?: boolean;
        mask?: string;
    }
    export function inquirer(params:IParameters): Promise<T>;

    export function checkNodeVersion(version:string): void;

    interface IPkgVersion {
        isUpdate: boolean;
        currentVersion: string;
        latestVersion: string;
    }
    export function checkPkgVersion(version:string, pkgName: string): Promise<IPkgVersion>;

    interface IInputArgs {
        [key:string]: any
    }
    export function getInputArgs(): IInputArgs;

    export function getLatestVersion(pkgName: string): Promise<string>;

    // ora 类型补充
    export const spinner: ora.Ora;
}
