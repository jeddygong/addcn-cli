/**
 * @description 创建项目
 * @author Jeddy
 * @create 2021-11-03 22:28:41
 */

import { npmlog } from '@addcn-cli/utils';

export interface ICreateParams {
    appName: string;
}

export const create = async ({ appName }: ICreateParams) => {
    npmlog.info('info', `${appName} start create project`);
};
