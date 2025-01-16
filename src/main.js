import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exit } from 'process'
import chalk from 'chalk'
import readlineSync from 'readline-sync'




// Simplify std out from `console.log` into `print`
const print = console.log


/**
 * TODO:
 * 
 * - Just complete the program flow based on some print below [0/7]
 */


const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data')

const showGuide = () => {
    print('This is a guide for this program!');
    for (let i = 1; i <= 5; i++) {
        print('Data: ', i)
    }


    if (!readlineSync.keyInYNStrict(chalk.green('Back?'))) {
        exit(0)
    }
}

const runDemo = () => {
    let files
    try {
        print('Scanning data input file ...')
        files = fs.readdirSync(dataDir)

        print('Choose file to do simple demo linear regression: ')
        files.forEach(file => {
            print(chalk.blue('- ', file))
        })
    } catch (error) {
        print(chalk.red('Error reading directory: ', error.message))
        return;
    }

    if (readlineSync.keyInYNStrict(chalk.green('Preview data?'))) {
        previewData('data passed')
    }
    
}

const previewData = (data) => {
    print('Preview data: ', data)

    if (readlineSync.keyInYNStrict(chalk.green('Continue next process?'))) {
        dataIdentification()
    }
}




const dataIdentification = () => {
    print('Data identification!')
    const feature = readlineSync.question('Choose feature: ')
    const label = readlineSync.question('Choose label: ')

    if (readlineSync.keyInYNStrict(chalk.green('Continue process data?'))) {
        processing()
    }
}




const processing = () => {
    print('Model processing!')
    for (let i = 1; i <= 20; i++) {
        print('iteration: ', i)
    }

    if (readlineSync.keyInYNStrict(chalk.green('Show visualization: '))) {
        visualization()
    }
}





const visualization = () => {
    print('Visualization here!')
    print('Graph, chart, or whatever...')


    // 7
    print('Show the prove of linear equation is actually match with user data')
}







/////////////////////////////////////////////////////////////////////
////  6MMMMb\ MMMMMMMMMM       dM.     `MMMMMMMb.  MMMMMMMMMM   /////
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

do {
    console.clear()
    print(`
==========================
        WELCOME!
==========================
SIMPLE LINEAR REGRESSION DEMO
==========================
-----------MENU-----------
==========================
1. Guide
2. Run demo
3. Exit
==========================
    `)

    const selectedMenu = readlineSync.questionInt(chalk.green('Choose menu: '))
    console.clear()

    switch (selectedMenu) {
        case 1:
            showGuide()
            break;
        case 2:
            runDemo()
            break;
        case 3:
            print('Bye!')
            exit(0);
            break;
        default:
            print('Invalid input! Menu can not be found!')
            break;
    }

} while (readlineSync.keyInYNStrict(chalk.green('\nContinue program? ')))
