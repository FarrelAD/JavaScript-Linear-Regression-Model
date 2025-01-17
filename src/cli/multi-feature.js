import { confirm } from '@inquirer/prompts'


const print = console.log;


export default async function multiFeatureProcess() {
    print('Multi feature process')

    if (await confirm({ message: 'Show visualization?'})) {
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
