/**
 * Hasil pengamatan data:
 * - Data yang didapat berupa klasemen sederhana liga Inggris
 * - Kolom pertama berisi rangking tim
 * - Kolom kedua total gol dalam semusim
 * - Kolom ketiga berisi point yang didapat
 */

/**
 * TANTANGAN!
 * 
 * 1. Tentukan prediksi total gol berdasarkan jumlah shot on target
 *    yang diketahui
 * 2. 
 */



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



import fs from 'fs'
import csv from 'csv-parser'
import Table from 'cli-table3'


const standingsTable = new Table({
    head: ['Pos', 'Club', 'Played', 'Won', 'Draw', 'Lost', 'Points']
})

const goalShotOnTargetTable = new Table({
    head: ['Pos', 'Club', 'Played', 'Goals', 'Shot on target']
})


const readFileAsync = (tableObj, filePath, textPreview) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => tableObj.push(Object.values(row)))
            .on('end', () => {
                console.log(`\n\n${textPreview}`)
                console.log(tableObj.toString())
                resolve()
            })
            .on('error', (error) => reject(error))
    })
}


try {
    await Promise.all([
        readFileAsync(standingsTable, 'data/standings.csv', 'Klasemen Liga Inggris 2024/2025 Minggu ke-20'),
        readFileAsync(goalShotOnTargetTable, 'data/goals_shot_on_target.csv', 'Tabel Gol dan Shot On Target Liga Inggris Minggu ke-20')
    ])
} catch (error) {
    console.error('Error read file: ', error)
}



/**
 * Menghitung total goal dan shot on target selama 20 minggu terakhir
 * 
 * - Diketahui data goal berada di indeks ke-3
 * - Diketahui data shot on target berada di indeks ke-4
 */

const totalGoal = goalShotOnTargetTable.reduce((sum, val) => sum + BigInt(parseInt(val[3])), 0n)
const totalShotOnTarget = goalShotOnTargetTable.reduce((sum, val) => sum + BigInt(parseInt(val[4])), 0n)

console.log('Total Gol: ', totalGoal)
console.log('Total shot on target: ', totalShotOnTarget)



/**
 * Menghitung nilai kuadrat dari total shot on target
 */

const squareTotalShotOnTarget = goalShotOnTargetTable.reduce((sum, val) => {
    return sum + BigInt(val[4]) ** 2n
}, 0n)

console.log('Total data shot on target kuadrat: ', squareTotalShotOnTarget)


/**
 * Menghitung nilai total dari goal kali shot on target
 */
const totalGoalTimesShotOnTarget = goalShotOnTargetTable.reduce((sum, val) => {
    return sum + BigInt(parseInt(val[3]) * parseInt(val[4]))
}, 0n)

console.log('Total data jumlah gol kali shot on target: ', totalGoalTimesShotOnTarget)



/**
 * Menghitung nilai total dari seluruh goal dengan seluruh shot on target
 */
const totalAllGoalTimesShotOnTarget = BigInt(totalGoal * totalShotOnTarget)

console.log('Total seluruh goal kali shot on target: ', totalAllGoalTimesShotOnTarget)

/**
 * Menentukan nilai b
 */

const totalData = BigInt(goalShotOnTargetTable.length)
console.log('Panjang data: ', totalData)

const b = (
    ((totalData * totalGoalTimesShotOnTarget) - totalAllGoalTimesShotOnTarget) /
    ((totalData * squareTotalShotOnTarget) - (totalShotOnTarget ** 2n))
)

console.log('Nilai b: ', b)


/**
 * Menentukan nilai a
 */

const a = null

console.log('Nilai a: ', a)
