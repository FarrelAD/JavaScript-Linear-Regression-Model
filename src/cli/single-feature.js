import chalk from 'chalk'
import readlineSync from 'readline-sync'



const print = console.log;


export default function singleFeatureProcess() {
    print('Single feature process')

    if (readlineSync.keyInYNStrict(chalk.green('\nShow visualization'))) {
        visualization()
    }
}



function visualization() {
    print('\n-----------------------------------------------------\n')
    print('Visualization here!')
    print('Graph, chart, or whatever...')


    // 7
    print('Show the prove of linear equation is actually match with user data')
}
