/**
 * @description 交互式命令行工具
 * @author Jeddy
 * @create 2021-08-31 19:33:18
 */

import cusInquirer from 'inquirer';

interface IParameters {
    type: string;
    name: string;
    choices?: [];
    default?: string | number | undefined | null;
    defaultValue?: string | number | undefined | null | boolean;
    message: string;
    require?: boolean;
    mask?: string;
}

const inquirer = cusInquirer;

// export default inquirer;

export default async function ({
    type = 'list',
    name,
    choices = [],
    defaultValue,
    message,
    require = true,
    mask = '*',
}: IParameters) {
    const options = {
        type,
        name,
        message,
        default: defaultValue,
        require,
        mask,
        choices,
    };
    // if (type === 'list') {
    //     options.choices = choices;
    // }
    // console.log(inquirer, 'inquirer');

    const nowOpt = await inquirer.prompt([options]);

    return nowOpt[options.name];

    // return inquirer.prompt([options]).then((answer) => answer.name);
}
