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

const totalGoal = goalShotOnTargetTable.reduce((sum, val) => sum + parseInt(val[3]), 0)
const totalShotOnTarget = goalShotOnTargetTable.reduce((sum, val) => sum + parseInt(val[4]), 0)

console.log('\nTotal Gol: ', totalGoal)
console.log('Total shot on target: ', totalShotOnTarget)



/**
 * Menghitung nilai kuadrat dari total shot on target
 */

const squareTotalShotOnTarget = goalShotOnTargetTable.reduce((sum, val) => {
    return sum + val[4] ** 2
}, 0)

console.log('Total data shot on target kuadrat: ', squareTotalShotOnTarget)


/**
 * Menghitung nilai total dari goal kali shot on target
 */
const totalGoalTimesShotOnTarget = goalShotOnTargetTable.reduce((sum, val) => {
    return sum + parseInt(val[3]) * parseInt(val[4])
}, 0)

console.log('Total data jumlah gol kali shot on target: ', totalGoalTimesShotOnTarget)



/**
 * Menghitung nilai total dari seluruh goal dengan seluruh shot on target
 */
const totalAllGoalTimesShotOnTarget = totalGoal * totalShotOnTarget

console.log('Total seluruh goal kali shot on target: ', totalAllGoalTimesShotOnTarget)

/**
 * Menentukan nilai b
 */

const totalData = goalShotOnTargetTable.length
console.log('Panjang data: ', totalData)

const b = (
    ((totalData * totalGoalTimesShotOnTarget) - totalAllGoalTimesShotOnTarget) /
    ((totalData * squareTotalShotOnTarget) - (totalShotOnTarget ** 2))
)

console.log('\nNilai b: ', b)


/**
 * Menentukan nilai a
 */

const a = (totalGoal / totalData) - (b * (totalShotOnTarget / totalData))

console.log('Nilai a: ', a)



/**
 * Menentukan persamaan
 * 
 * Persamaan dasar: f(x) = a + bx
 * x : nilai shot on target yang diketahui
 */

const fx = (x) => a + (b * x)

// Versi teks
console.log(`\nDidapatkan persamaan: ${a} + ${b}x`)

/**
 * Percobaan pengujian
 * 
 * Menentukan perkiraan jumlah goal berdasarkan jumlah shot on target
 * - Jika shot on target berjumlah 130
 * - Jika shot on target berjumlah 234
 * - Jika shot on target berjumlah 87
 */

console.log('\nTotal goal jika shot on target 130: ', fx(130))
console.log('Total goal jika shot on target 234: ', fx(234))
console.log('Total goal jika shot on target 87: ', fx(87))
