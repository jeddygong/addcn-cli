/// <reference path="../../packages/utils/node_modules/@types/npmlog"/>
/// <reference path="./../../packages/utils/node_modules/@types/inquirer/index.d.ts"/>
/// <reference path="./../../packages/utils/node_modules/ora/index.d.ts"/>

/**
 * @description 工具包声明文件
 * @author Jeddy
 * @create 2021-08-16 23:09:35
 */
interface IUtils {
    utils: () => void;
}

// inquirer 参数定义
declare module '@addcn-cli/utils' {
    export const npmlog: npmlog.Logger;
    interface IParameters {
        type: string;
        name?: string;
        choices?: { name: string; value: string | number }[];
        default?: string | number | undefined | null | string[];
        defaultValue?: string | number | undefined | null | boolean;
        message: string;
        require?: boolean;
        mask?: string;
    }
    export function inquirer(params: IParameters): Promise<T>;

    export function checkNodeVersion(version: string): void;

    interface IPkgVersion {
        isUpdate: boolean;
        currentVersion: string;
        latestVersion: string;
    }
    export function checkPkgVersion(
        currentVersion: string,
        pkgName: string,
    ): Promise<IPkgVersion>;

    interface IInputArgs {
        [key: string]: any;
    }
    export function getInputArgs(): IInputArgs;

    export function getLatestVersion(pkgName: string): Promise<string>;

    export function exec(
        command: string,
        options?: child_process.ExecOptions,
    ): Promise<string>;

    export function download(url: string, appName: string): Promise<string>;

    export const spinner: ora.Ora;
}
