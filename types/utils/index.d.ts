/// <reference path="../../packages/utils/node_modules/@types/npmlog"/>
/// <reference path="./../../packages/utils/node_modules/@types/inquirer/index.d.ts"/>
/// <reference path="./../../packages/utils/node_modules/ora/index.d.ts"/>

// import npmlog from '../../packages/utils/node_modules/@types/npmlog';
/**
 * @description 工具包声明文件
 * @author Jeddy
 * @create 2021-08-16 23:09:35
 */

// import './npmlog';
// import npmlog from '../../packages/utils/node_modules/@types/npmlog';
// import ora from '../../packages/utils/node_modules/ora/index.d.ts';

// import { npmlog } from '@addcn-cli/utils';

// 相互之间引用的写法如下：这就代表这里依赖了npmlog.d.ts了
// / <reference path="./npmlog.d.ts"/>
// import "./npmlog.d.ts";
// / <reference path="./../../packages/utils/node_modules/@types/inquirer/index.d.ts"/>
// / <reference path="./../../packages/utils/node_modules/ora/index.d.ts"/>
interface IUtils {
    utils: () => void;
}


// inquirer 参数定义
declare module '@addcn-cli/utils' {
    // const utils: IUtils;
    // export default utils; 这样会报错
    // declare const utils: IUtils;
    // export function utils(): void;

    // var npmlog: npmlog.Logger;
    // export = npmlog;
    // export const npmlog{
    //     // const name: string;
    //     (options?: npmlog.Logger | string): npmlog.Logger;
    // };
    // interface Foo extends OtherType {}
    // interface npmlog extends npmlog.Logger;
    // interface Inpmlog<T> {
    //     map<U>(f: (x: T) => U): npmlog.Logger<U>;
    // }
    // import npmlog from '../../packages/utils/node_modules/@types/npmlog';

    export const npmlog:npmlog.Logger;;
    
    // export = npmlog: npmlog.Logger;

    interface IParameters {
        type: string;
        name?: string;
        choices?: { name:string, value:string | number }[];
        default?: string | number | undefined | null | string[];
        defaultValue?: string | number | undefined | null | boolean;
        message: string;
        require?: boolean;
        mask?: string;
    }
    export function inquirer(params:IParameters): Promise<T>;
    // ora 类型补充
    // export const inquirer: inquirer;

    export function checkNodeVersion(version:string): void;

    interface IPkgVersion {
        isUpdate: boolean;
        currentVersion: string;
        latestVersion: string;
    }
    export function checkPkgVersion(currentVersion:string, pkgName: string): Promise<IPkgVersion>;

    interface IInputArgs {
        [key:string]: any
    }
    export function getInputArgs(): IInputArgs;

    export function getLatestVersion(pkgName: string): Promise<string>;

    export function exec(command: string, options?: child_process.ExecOptions):  Promise<string> ;

    // ora 类型补充
    // declare const spinner: ora.Ora;
    
    // var spinner: ora.Ora;;
    export const spinner: ora.Ora;
    // export = spinner;
    // export const spinner: {
    //     (options?: ora.Options | string): ora.Ora;
    // };
}

/**
 * Provides the functionality to prompt questions.
 */
//  declare var inquirer: inquirer.Inquirer;
//  export = inquirer;