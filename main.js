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

fs.createReadStream('data/standings.csv')
    .pipe(csv())
    .on('data', (row) => {
        standingsTable.push([row.pos, row.club, row.played, row.won, row.draw, row.lost, row.points])
    })
    .on('end', () => {
        console.log('\n\nKlasemen Liga Inggris 2024/2025 Minggu ke-20')
        console.log(standingsTable.toString())
    })


const goalShotOnTargetTable = new Table({
    head: ['Pos', 'Club', 'Played', 'Goals', 'Shot on target']
})

const dataHaha = fs.createReadStream('data/goals_shot_on_target.csv')
    .pipe(csv())
    .on('data', (row) => {
        goalShotOnTargetTable.push([row.pos, row.club, row.played, row.goals, row.shot_on])
    })
    .on('end', () => {
        console.log('\n\nTabel Gol dan Shot On Target Liga Inggris Minggu ke-20')
        console.log(goalShotOnTargetTable.toString())

        console.log('hasil 2')
        goalShotOnTargetTable.values().forEach(element => {
            console.log(element)
            console.log(element[0])
        });
    })
