/**
 * @description 日志工具函数
 * @author jeddy
 * @create 2021-08-17 22:35:31
 */

import log from 'npmlog';

// log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';

log.heading = 'addcn'; // 自定义头部
log.addLevel('success', 2000, { fg: 'green', bold: true }); // 自定义success日志
log.addLevel('notice', 2000, { fg: 'blue', bg: 'black' }); // 自定义notice日志

export default log;
