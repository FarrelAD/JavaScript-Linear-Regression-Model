import fs from 'fs'
import { readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { exit } from 'process'
import chalk from 'chalk'
import { confirm, select } from '@inquirer/prompts'
import csv from 'csv-parser'
import Table from 'cli-table3'

import singleFeatureProcess from './single-feature.js'
import multiFeatureProcess from './multi-feature.js'




// Simplify std out from `console.log` into `print`
const print = console.log;


const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');


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

do {
    console.clear()
    print(
`==========================
    WELCOME!
==========================
SIMPLE LINEAR REGRESSION DEMO
`)

    const answers = await select({
        message: 'Choose menu',
        choices: [
            '1. Guide',
            '2. Run Demo',
            '3. Exit'
        ]
    })

    console.clear()


    switch (answers) {
        case '1. Guide': await showGuide(); break;
        case '2. Run Demo': await runDemo(); break;
        case '3. Exit': print('Thanks, bye!'); exit(0);
    }
} while (await confirm({ message: 'Continue program?' }))






async function showGuide() {
    print('This is a guide for this program!');
    for (let i = 1; i <= 5; i++) {
        print('Data: ', i)
    }


    if (!await confirm({ message: 'Back?'})) {
        exit(0)
    }
}



async function runDemo() {
    let files
    try {
        print('Scanning data input file ...')
        files = await readdir(DATA_DIR)
    } catch (error) {
        print(chalk.red('Error reading directory: ', error.message))
        return;
    }


    const answers = await select({
        message: 'Choose data',
        choices: files
    })

    if (await confirm({ message: 'Preview data?'})) {
        await previewData(answers)
    }
}



function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        const data = []
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (error) => reject(error))
    })
}



async function previewData(filePath) {
    print('\n-----------------------------------------------------\n')
    print('Preview data: ', filePath)

    const data = await readFileAsync(path.join(DATA_DIR, filePath))

    const table = new Table({
        head: Object.keys(data[0])
    })

    data.forEach(row => {
        table.push(Object.values(row))
    })

    print(table.toString())

    if (await confirm({ message: 'Continue next process' })) {
        await dataIdentification(data)
    }
}



async function dataIdentification(data) {
    console.clear()
    print('-----------------------------------------------------\n')
    print('Data identification')


    const answers = await select({
        message: 'Choose model type',
        choices: [
            '1. Single feature',
            '2. Multi feature'
        ]
    })

    console.clear()
    
    switch (answers) {
        case '1. Single feature': await singleFeatureProcess(data); break;
        case '2. Multi feature': await multiFeatureProcess(data); break;
    }
}
