/**
 * @description 项目全局配置
 * @author Jeddy
 * @create 2021-11-03 22:28:41
 */

import { homedir } from 'os'; // 兼容性
// 获取跟路径
const root = homedir();

// 支持的node最低版本
export const LOWEST_NODE_VERSION = '12.0.0';

// 模板路径
export const TEMPLATE_PATH = `${root}/.addcn_cli_templates`;
