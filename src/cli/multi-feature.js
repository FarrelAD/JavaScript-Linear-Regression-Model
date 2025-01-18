import process from 'process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { input, confirm } from '@inquirer/prompts'



// Simplify std out from `console.log` into `print`
const print = console.log;



/**
 * Process linear regression with multi feature
 * 
 * Formula
 * y = a + bx
 * 
 * @param {Array} data - the raw data
 */
export default async function multiFeatureProcess(data) {
    print('=====================================================\n')
    print(chalk.blue('MULTI FEATURE PROCESS\n'))

    const answers = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'features',
            message: 'Choose independent variable',
            choices: Object.keys(data[0])
        },
        {
            type: 'list',
            name: 'label',
            message: 'Choose dependent variable',
            choices: Object.keys(data[0])
        }
    ])


    for (const feature of answers.features) {
        if (feature == answers.label) {
            print(chalk.redBright('\n[!]  Feature and label can not be same'))
            
            if (await confirm({ message: 'Back?'})) return;
        }
    }


    // const numberPattern = /^[+-]?\d+(\.\d+)?$/
    // for (const item of data) {
    //     if (!numberPattern.test(item[answers.features]) || !numberPattern.test(item[answers.label])) {
    //         print(chalk.redBright('\n[!]  Some data is not a number! Unable to process further!'))
    //         await confirm({ message: 'Continue?'})
    //         return;
    //     }
    // }


    /**
     * Calculate the value a and b to get equation y = a + bx
    */
    const sumY = data.reduce((sum, val) => sum + parseInt(val[answers.label]), 0)

    const sumXi = []
    const sumXiSquared = []
    const sumXiYi = [] // ? how ?
    
    for (let i = 0; i < answers.features.length; i++) {
        sumXi.push(data.reduce((sum, val) => sum + parseInt(val[answers.features[i]]), 0))
        sumXiSquared.push(data.reduce((sum, val) => sum + parseInt(val[answers.features[i]]) ** 2, 0))
    }

    const sumAllXi = sumXi.reduce((sum, val) => sum * val)
    const sumAllXiSquared = sumXiSquared.reduce((sum, val) => sum * val)

    const slopes = []
    for (let i = 0; i < answers.features.length; i++) {
        slopes.push(
            ((data.length * sumXiYi) - (sumAllXi * sumY)) /
            ((data.length * sumAllXiSquared) - (sumAllXi ** 2))
        )
    }

    let sumSlopeiXi = 0
    for (let i = 0; i < slopes.length; i++) {
        sumSlopeiXi += slopes[i] * (sumXi[i] / data.length)
    }


    /**
     * INSPECTION!
     */
    print('sumY: ', sumY)
    print('sumXi: ', sumXi)
    print('slopes: ', slopes)
    print('sumXiSquare: ', sumXiSquared)
    print('sumAllXiSquared: ', sumAllXiSquared)
    print('sumXiYi: ', sumXiYi)

    const a = (sumY / data.length) - sumSlopeiXi

    // Equation result
    const y = (x) => a + slopes.reduce((sum, val, index) => sum + (val * x[index]))


    // Print the equation
    process.stdout.write(chalk.blueBright(`\nEquation result: ${a} + `))

    slopes.forEach((val, index) => {
        process.stdout.write(chalk.blueBright(`${val}x\u1d62`))
        if (index != slopes.length - 1) process.stdout.write(chalk.blueBright(' + '))
    })

    print('\n\r')

    if (await confirm({ message: 'Do you want to test?'})) {
        do {
            await testing(y, answers.features, answers.label)
        } while (await confirm({ message: 'Do you want to test again?'}));
    }
    

    evaluation()
}


async function testing(y, features, label) {
    const inputInquirer = features.map(feature => {
        return {
            type: 'number',
            name: feature,
            message: `Input ${feature}`
        }
    })
    
    const inputFeatures = await inquirer.prompt(inputInquirer)
    print(`Prediction ${label}:`, chalk.blueBright(`${y(Object.values(inputFeatures))}`))
}


function evaluation() {
    print('Evaluation!')
    print('MSE, MAE, RMSE')
}
