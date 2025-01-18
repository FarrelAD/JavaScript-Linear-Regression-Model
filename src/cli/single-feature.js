import chalk from 'chalk'
import inquirer from 'inquirer'
import { input, confirm } from '@inquirer/prompts'



/**
 * Simplify std out from `console.log` into `print`
 */
const print = console.log;



/**
 * Process linear regression with single feature
 * 
 * Formula
 * `y = β0 ​+ β1​x1`
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
        print(chalk.redBright('\n[!]  Feature and label can not be same'))
        
        await confirm({ message: 'Back?'})
        return
    }


    const numberPattern = /^[+-]?\d+(\.\d+)?$/
    for (const item of data) {
        if (!numberPattern.test(item[answers.feature]) || !numberPattern.test(item[answers.label])) {
            print(chalk.redBright('\n[!]  Some data is not a number! Unable to process further!'))
            await confirm({ message: 'Continue?'})
            return
        }
    }


    const equation = modelling(data, answers)


    if (await confirm({ message: 'Do you want to test?'})) {
        do {
            await testing(equation, answers.feature, answers.label)
        } while (await confirm({ message: 'Do you want to test again?'}));
    }
}



/**
 * Calculate the value a and b to get equation y = a + bx
 * a : intercept
 * b : slope
 * 
 * `feature` is `x` and `label` is `y`
 * 
 * @param {Array} data - raw data
 * @param {Object} answers - the input of features and label from user
 * @returns {function(x): number} a function of linear equation
 */
function modelling(data, answers) {
    const sumX = data.reduce((sum, val) => sum + parseFloat(val[answers.feature]), 0)
    const sumY = data.reduce((sum, val) => sum + parseFloat(val[answers.label]), 0)
    const sumXY = data.reduce((sum, val) => sum + (parseFloat(val[answers.feature]) * parseFloat(val[answers.label])), 0)
    const sumXSquared = data.reduce((sum, val) => sum + parseFloat(val[answers.feature]) ** 2, 0)
    const sumXTimesSumY = sumX * sumY

    const b = (
        ((data.length * sumXY) - sumXTimesSumY) /
        ((data.length * sumXSquared) - (sumX ** 2))
    )

    const a = (sumY / data.length) - (b * (sumX / data.length))

    /**
     * Linear equation result based on data processing
     * 
     * @param {number} x - a feature data
     * @returns {number} a label/target/`y` value result
     */
    const y = (x) => a + (b * x)

    // Print the equation
    print(chalk.blueBright(`\nEquation result: y = ${a} + ${b}x`))

    return y
}


async function testing(equation, feature, label) {
    const inputFeature = await input({message: `Input ${feature}`})
    print(`Prediction ${label}: ${equation(inputFeature)}`)
}
