import chalk from 'chalk'
import inquirer from 'inquirer'
import { input, confirm } from '@inquirer/prompts'



// Simplify std out from `console.log` into `print`
const print = console.log;



/**
 * Process linear regression with single feature
 * 
 * Formula
 * y = a + bx
 * 
 * @param {Array} data - the raw data
 */
export default async function singleFeatureProcess(data) {
    print('=====================================================\n')
    print(chalk.blue('SINGLE FEATURE PROCESS\n'))

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'feature',
            message: 'Choose feature',
            choices: Object.keys(data[0])
        },
        {
            type: 'list',
            name: 'label',
            message: 'Choose label',
            choices: Object.keys(data[0])
        }
    ])

    if (answers.feature == answers.label) {
        print(chalk.bgMagenta('Feature and label can not be same'))
        
        if (await confirm({ message: 'Back?'})) return;
    }


    for (const item of data) {
        if (!Number.isNaN(item[answers.feature]) || !Number.isNaN(item[answers.label])) {
            print(chalk.redBright('\n[!]  Some data is not a number! Unable to process further!'))
            await confirm({ message: 'Continue?'})
            return;
        }
    }


    /**
     * Calculate the value a and b to get equation y = a + bx
     * Let's assume `feature` is `x` and `label` is `y`
    */
    const sumX = data.reduce((sum, val) => sum + parseInt(val[answers.feature]), 0)
    const sumY = data.reduce((sum, val) => sum + parseInt(val[answers.label]), 0)
    const sumXY = data.reduce((sum, val) => sum + (parseInt(val[answers.feature]) * parseInt(val[answers.label])), 0)
    const sumXSquared = data.reduce((sum, val) => sum + parseInt(val[answers.feature]) ** 2, 0)
    const sumXTimesSumY = sumX * sumY

    const b = (
        ((data.length * sumXY) - sumXTimesSumY) /
        ((data.length * sumXSquared) - (sumX ** 2))
    )

    const a = (sumY / data.length) - (b * (sumX / data.length))

    // Equation result
    const y = (x) => a + (b * x)

    // Print the equation
    print(chalk.blueBright(`\nEquation result: ${a} + ${b}x`))



    if (await confirm({ message: 'Do you want to test?'})) {
        do {
            await testing(y, answers.feature, answers.label)
        } while (await confirm({ message: 'Do you want to test again?'}));
    }
    

    evaluation()
}


async function testing(y, feature, label) {
    const inputFeature = await input({message: `Input ${feature}`})
    print(`Prediction ${label}: ${y(inputFeature)}`)
}


function evaluation() {
    print('Evaluation!')
    print('MSE, MAE, RMSE')
}
