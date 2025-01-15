import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import readlineSync from 'readline-sync'




/**
 * TODO:
 * 
 * - Just complete the program flow based on some console.log below [0/7]
 */


const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data')


let confirmation = 0
do {
    console.log(`
==========================
        WELCOME!
==========================
SIMPLE LINEAR REGRESSION DEMO
    `)

    // 1
    console.log('Show menu')

    console.log(`
==========================
1. Guide
2. Run demo
==========================
`)

    let files
    try {
        console.log('Scanning data input file ...')
        files = fs.readdirSync(dataDir)

        console.log('Choose file to do simple demo linear regression: ')
        files.forEach(file => {
            console.log(chalk.blue('- ', file))
        })
    } catch (error) {
        console.error(chalk.red('Error reading directory: ', error.message))
    }

    
    // 2
    console.log('Preview data')

    // 3
    console.log('Choose feature')

    // 4
    console.log('Choose target')

    // 5
    console.log('Processing...')

    // 6
    console.log('Show the linear equation result')

    // 7
    console.log('Show the prove of linear equation is actually match with user data')

    confirmation = readlineSync.questionInt('Continue? ')
} while (confirmation == 0);

