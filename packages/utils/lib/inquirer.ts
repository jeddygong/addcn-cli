/**
 * @description 交互式命令行工具
 * @author Jeddy
 * @create 2021-08-31 19:33:18
 */

import inquirer from 'inquirer';

interface IParameters {
    type: string;
    name?: string;
    choices?: [];
    default?: string | number | undefined | null;
    defaultValue?: string | number | undefined | null | boolean;
    message: string;
    require?: boolean;
    mask?: string;
}

export default function ({
    choices = [],
    defaultValue,
    message,
    type = 'list',
    require = true,
    mask = '*',
}: IParameters) {
    const options = {
        type,
        name: 'name',
        message,
        default: defaultValue,
        require,
        mask,
        choices: [],
    };
    if (type === 'list') {
        options.choices = choices;
    }
    // console.log(inquirer, 'inquirer');

    return inquirer.prompt([options]).then((answer) => answer.name);
}
