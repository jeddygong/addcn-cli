import path from 'path';
import fs from 'fs';
import fsExtra from 'fs-extra';
// import { promisify } from 'util';
// import child_process from 'child_process';
/**
 * @description 添加 typescript 的配置方法
 */
export const addTypescriptExtend = async (url: string) => {
    console.log('这是添加typescript 的配置');

    // 下载对应的插件 typescript 和 @types/node @typescript-eslint/eslint-plugin @typescript-eslint
    // 如果需要 parser 就下载对应的 @typescript-eslint/parser
    // 用 npm 下载包建议使用shell.js, 因为它只能安装一个, 所以可以添加对应的版本到package.json 中去

    // 前提是下载完成了
    // 1. 进入对应的目录，并且添加对应的插件
    // child_process.exec(
    //     'npm i typescript @types/node @typescript-eslint/eslint-plugin @typescript-eslint -D',
    //     (err, stdout, stderr) => {
    //         console.log(err, stdout, stderr);
    //     },
    // );
    // 用 npm 下载包建议使用shell.js, 因为它只能安装一个, 所以可以添加对应的版本到package.json 中去
    // const execVue = child_process.spawn(
    //     `npm`,
    //     // typescript @types/node @typescript-eslint/eslint-plugin @typescript-eslint
    //     [`install`, 'typescript', '-D'],
    //     {
    //         stdio: 'inherit',
    //         // cwd: '/Users/gongjin/Documents/study/front-end/cli/my-cli-ts/packages/core',
    //     },
    // );

    // 2. 添加对应的 eslint 配置
    const eslintJson = {
        root: true,
        parser: '@typescript-eslint/parser',

        plugins: ['@typescript-eslint'],

        parserOptions: {
            parser: '@typescript-eslint/parser',
            ecmaVersion: 2020,
            sourceType: 'module',
        },

        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'prettier',
            'plugin:prettier/recommended',
        ],

        // 环境
        env: {
            node: true,
            browser: true,
            commonjs: true,
            es6: true,
            jquery: true,
        },

        rules: {},
    };

    // 3. 写入到当前项目的 json 中
    // 3.1 两种方法可以解决输出的是格式化的json，1：直接传入``；2：JSON.stringify(eslintJson, null, '\t')
    fs.writeFileSync(
        `./${url}/.eslintrc.json`,
        JSON.stringify(eslintJson, null, '\t'),
        {
            encoding: 'utf-8',
        },
    );

    // 4. 添加插件和命令至 json 中
    // const pathJson = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(
        fs.readFileSync(`./${url}/package.json`, {
            encoding: 'utf-8',
        }),
    );

    // 4.1 添加对应的插件
    // typescript 和 @types/node @typescript-eslint/eslint-plugin @typescript-eslint
    packageJson.devDependencies['typescript'] = '^4.3.4';
    packageJson.devDependencies['@types/node'] = '^15.12.5';
    packageJson.devDependencies['@typescript-eslint/eslint-plugin'] = '^4.28.1';
    packageJson.devDependencies['@typescript-eslint/parser'] = '4.28.1';
    console.log(packageJson, 'packageJson');
    // 4.2 写入至 package.json
    fs.writeFileSync(
        `./${url}/test.json`,
        JSON.stringify(packageJson, null, '\t'),
        {
            encoding: 'utf-8',
        },
    );

    // 开始执行命令

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const readPkg = require(pathJson);
    // const readPkg = readFile(pathJson);
    // console.log(readPkg, 'readPkg');

    // 2. 添加对应的 ts 插件

    // 3. return
};

/**
 * @description 添加 prettier
 */
export const addPrettierExtend = async (url: string) => {
    // 1. 执行下载命令
    console.log('这是添加prettier');
    // 2. 配置当前 prettier
    const prettierJSON = `module.exports = {
    // 一行最多 80 字符
    printWidth: 80,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用 tab 缩进，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号代替双引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾使用逗号
    trailingComma: 'all',
    // 大括号内的首尾需要空格 { foo: bar }
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf',
}`;

    // 3. 写入当前目录
    fs.writeFileSync(`./${url}/.prettierrc.js`, prettierJSON, {
        encoding: 'utf-8',
    });

    // 4. 添加插件和命令至 json 中
    // const pathJson = path.join(__dirname, `./${url}/package.json`);
    const packageJson = JSON.parse(
        fs.readFileSync(`./${url}/package.json`, {
            encoding: 'utf-8',
        }),
    );

    // 4.1 添加对应的插件
    // typescript 和 @types/node @typescript-eslint/eslint-plugin @typescript-eslint
    packageJson.devDependencies['prettier'] = '^2.3.2';
    packageJson.devDependencies['eslint-config-prettier'] = '^8.3.0';
    packageJson.devDependencies['eslint-plugin-prettier'] = '^3.4.0';
    console.log(packageJson, 'packageJson');
    // 4.2 写入至 package.json
    fs.writeFileSync(
        `./${url}/test.json`,
        JSON.stringify(packageJson, null, '\t'),
        {
            encoding: 'utf-8',
        },
    );
};

/**
 * @description 添加 commitizen(规范 git 提交) 和 添加 Husky
 */
export const addCZAndHuskyExtend = async (url: string) => {
    console.log('这是添加commitizen');
    // 1.执行commitizen对应的命令

    // 1.1 执行Husky对应的命令

    // 2. 添加cz-customizable的配置 对应的配置文件 commitizen 和 Husky
    const czConfigJSON = `module.exports = {
    types: [
        {value: 'init',     name: 'init:     初始提交'},
        {value: 'feature',  name: 'feat:     增加新功能'},
        {value: 'fix',      name: 'fix:      修复bug'},
        {value: 'ui',       name: 'ui:       更新UI'},
        {value: 'style',    name: 'style:    代码格式(不影响代码运行的变动)'},
        {value: 'perf',     name: 'perf:     性能优化'},
        {value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)'},
        {value: 'release',  name: 'release:  发布'},
        {value: 'deploy',   name: 'deploy:   部署'},
        {value: 'test',     name: 'test:     增加测试'},
        {value: 'docs',     name: 'docs:     文档变更'},
        {value: 'chore',    name: 'chore:    构建过程或辅助工具的变动(更改配置文件)'},
        {value: 'revert',   name: 'revert:   回退'},
        {value: 'build',    name: 'build:    打包'}
    ],
    // override the messages, defaults are as follows
    messages: {
        type: '请选择提交类型:',
        // scope: '请输入文件修改范围(可选):',
        // used if allowCustomScopes is true
        customScope: '请输入您修改的范围(可选):',
        subject: '请简要描述提交 message (必填):',
        body: '请输入详细描述(可选，待优化去除，跳过即可):',
        footer: '请输入要关闭的issue(待优化去除，跳过即可):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
    },
    allowCustomScopes: true,
    // allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['body', 'footer'],
    // limit subject length, commitlint默认是72
    subjectLimit: 72
}`;

    // 2.1 添加配置
    const commitizenJSON = `module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
                'feature', // 新功能（feature）
                'fix', // 修补bug
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
                'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
            ],
        ],
        // <type> 格式 小写
        'type-case': [2, 'always', 'lower-case'],
        // <type> 不能为空
        'type-empty': [2, 'never'],
        // <scope> 范围不能为空
        'scope-empty': [2, 'never'],
        // <scope> 范围格式
        'scope-case': [0],
        // <subject> 主要 message 不能为空
        'subject-empty': [2, 'never'],
        // <subject> 以什么为结束标志，禁用
        'subject-full-stop': [0, 'never'],
        // <subject> 格式，禁用
        'subject-case': [0, 'never'],
        // <body> 以空行开头
        'body-leading-blank': [1, 'always'],
        'header-max-length': [0, 'always', 72],
    },
};`;
    // 3. 写入当前目录
    fs.writeFileSync(`./${url}/.cz-config.js`, czConfigJSON, {
        encoding: 'utf-8',
    });
    fs.writeFileSync(`./${url}/commitlint.config.js`, commitizenJSON, {
        encoding: 'utf-8',
    });

    // 4. 写入json
    // yarn add -D commitizen @commitlint/config-conventional @commitlint/cli cz-customizable husky
    // 4. 添加插件和命令至 json 中
    // const pathJson = path.join(__dirname, '../package.json');
    const packageJson = JSON.parse(
        fs.readFileSync(`./${url}/package.json`, {
            encoding: 'utf-8',
        }),
    );
    packageJson.devDependencies['commitizen'] = '^4.2.4';
    packageJson.devDependencies['@commitlint/cli'] = '^12.1.4';
    packageJson.devDependencies['@commitlint/config-conventional'] = '^12.1.4';
    packageJson.devDependencies['cz-customizable'] = '^6.3.0';
    packageJson.devDependencies['husky'] = '^7.0.0';
    console.log(packageJson, 'packageJson');
    // 4.2 写入至 package.json
    fs.writeFileSync('./test.json', JSON.stringify(packageJson, null, '\t'), {
        encoding: 'utf-8',
    });

    // 复制 husky 至当前项目
    const huskyPath = path.join(__dirname, '../../../../.husky');
    fsExtra.copySync(huskyPath, './test');
};