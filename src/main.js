import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exit } from 'process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import csv from 'csv-parser'
import Table from 'cli-table3'
import readlineSync from 'readline-sync'




// Simplify std out from `console.log` into `print`
const print = console.log


/**
 * TODO:
 * 
 * - Just complete the program flow based on some print below [0/7]
 */


const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data')

const showGuide = () => {
    print('This is a guide for this program!');
    for (let i = 1; i <= 5; i++) {
        print('Data: ', i)
    }


    if (!readlineSync.keyInYNStrict(chalk.green('\nBack'))) {
        exit(0)
    }
}

const runDemo = async () => {
    let files
    try {
        print('Scanning data input file ...')
        files = fs.readdirSync(DATA_DIR)
    } catch (error) {
        print(chalk.red('Error reading directory: ', error.message))
        return;
    }


    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'data',
            message: 'Choose data',
            choices: files
        }
    ])

    if (readlineSync.keyInYNStrict(chalk.green('\nPreview data'))) {
        await previewData(answers.data)
    }
}

const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        const data = []
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => {
                const table = new Table({
                    head: Object.keys(data[0])
                })

                data.forEach(row => {
                    table.push(Object.values(row))
                })

                console.log(table.toString())
                resolve()
            })
            .on('error', (error) => reject(error))
    })
}

const previewData = async (filePath) => {
    print('\n-----------------------------------------------------\n')
    print('Preview data: ', filePath)

    await Promise.all([readFileAsync(path.join(DATA_DIR, filePath))])


    if (readlineSync.keyInYNStrict(chalk.green('\nContinue next process'))) {
        dataIdentification()
    }
}




const dataIdentification = () => {
    print('\n-----------------------------------------------------\n')
    print('Data identification!')
    const feature = readlineSync.question('Choose feature: ')
    const label = readlineSync.question('Choose label: ')

    if (readlineSync.keyInYNStrict(chalk.green('\nContinue process data'))) {
        processing()
    }
}




const processing = () => {
    print('\n-----------------------------------------------------\n')
    print('Model processing!')
    for (let i = 1; i <= 20; i++) {
        print('iteration: ', i)
    }

    if (readlineSync.keyInYNStrict(chalk.green('\nShow visualization'))) {
        visualization()
    }
}





const visualization = () => {
    print('\n-----------------------------------------------------\n')
    print('Visualization here!')
    print('Graph, chart, or whatever...')


    // 7
    print('Show the prove of linear equation is actually match with user data')
}







/////////////////////////////////////////////////////////////////////
////   6MMMMb\ MMMMMMMMMM       dM.     `MMMMMMMb.  MMMMMMMMMM  /////
////  6M'    ` /   MM   \      ,MMb      MM    `Mb  /   MM   \  /////
////  MM           MM          d'YM.     MM     MM      MM      /////
////  YM.          MM         ,P `Mb     MM     MM      MM      /////
////   YMMMMb      MM         d'  YM.    MM    .M9      MM      /////
////       `Mb     MM        ,P   `Mb    MMMMMMM9'      MM      /////
////        MM     MM        d'    YM.   MM  \M\        MM      /////
////        MM     MM       ,MMMMMMMMb   MM   \M\       MM      /////
////  L    ,M9     MM       d'      YM.  MM    \M\      MM      /////
////  MYMMMM9     _MM_    _dM_     _dMM__MM_    \M\_   _MM_     /////
/////////////////////////////////////////////////////////////////////

const main = async () => {
    do {
        console.clear()
        print(`
==========================
        WELCOME!
==========================
SIMPLE LINEAR REGRESSION DEMO
        `)

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'Choose menu',
                choices: [
                    '1. Guide',
                    '2. Run Demo',
                    '3. Exit'
                ]
            }
        ])

        console.clear()
    
        switch (answers.menu) {
            case '1. Guide':
                showGuide()
                break;
            case '2. Run Demo':
                await runDemo()
                break;
            case '3. Exit':
                print('Thanks, bye!')
                exit(0)
                break;
            default:
                print('Invalid input!')
                break;
        }
    } while (readlineSync.keyInYNStrict(chalk.green('\nContinue program? ')))
}

main()
