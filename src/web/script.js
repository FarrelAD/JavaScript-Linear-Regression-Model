const dataForm = document.getElementById('data-form')
const inputFile = document.getElementById('input-file')
const fileName = document.getElementById('file-name')

const btnPreviewData = document.getElementById('btn-preview-data')
const previewData = document.getElementById('preview-data-container')

const btnBackContainer = document.getElementById('btn-back-container')
const btnBack = document.getElementById('btn-back')
const btnBackSupportText = document.getElementById('btn-back-support-text')
const btnNextContainer = document.getElementById('btn-next-container')
const btnNext = document.getElementById('btn-next')
const btnNextSupportText = document.getElementById('btn-next-support-text')

const sections = document.querySelectorAll('section')


const modelForm = document.getElementById('model-form')
const modelSelection = document.getElementById('model-selection')
const featureCheckboxContainer = document.getElementById('feature-checkbox-container')
const featureCheckbox = document.getElementById('feature-checkbox')
const featureSelectionContainer = document.getElementById('feature-selection-container')
const featureSelect = document.getElementById('feature-select')
const labelSelectionContainer = document.getElementById('label-selection-container')
const labelSelect = document.getElementById('label-select')

const equationResultContainer = document.getElementById('equation-result-container')
const equationResult = document.getElementById('equation-result')
const btnCopy = document.getElementById('btn-copy')



// Global data
/**
 * Linear equation result based on data processing
 * 
 * @param {number} x - a feature data
 * @returns {number} a label/target/`y` value result
 */
let equation = null
let currentSection = 0
const sectionsArray = [
    'Input data',
    'Model selection', 
    'Model visualization',
    'Model testing'
]
let fileData = null 

let chartInstance = null


btnBack.addEventListener('click', () => {
    sections[currentSection].classList.toggle('hidden')
    currentSection--
    sections[currentSection].classList.toggle('hidden')

    if (currentSection == 0) {
        btnBackContainer.classList.toggle('invisible')
    }

    if (currentSection < sectionsArray.length) {
        if (btnNextContainer.classList.contains('invisible')) {
            btnNextContainer.classList.remove('invisible')
        }
    }

    btnBackSupportText.textContent = sectionsArray[currentSection - 1] || ''
    btnNextSupportText.textContent = sectionsArray[currentSection + 1] || ''
})

btnNext.addEventListener('click', () => {
    sections[currentSection].classList.toggle('hidden')
    currentSection++
    sections[currentSection].classList.toggle('hidden')

    if (currentSection == sectionsArray.length - 1) {
        btnNextContainer.classList.toggle('invisible')
    }

    if (currentSection > 0) {
        if (btnBackContainer.classList.contains('invisible')) {
            btnBackContainer.classList.remove('invisible')
        }
    }
    
    btnBackSupportText.textContent = sectionsArray[currentSection - 1] || ''
    btnNextSupportText.textContent = sectionsArray[currentSection + 1] || ''
})




//////////////////////////////////////////////////
//// FIRST SECTION SCRIPT
//////////////////////////////////////////////////

dataForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const formData = new FormData(this)
    const file = formData.get('data')

    previewData.classList.remove('hidden')
    previewData.classList.add('block')

    if (file.size === 0) {
        previewData.innerHTML = `<h4 class="text-center">No file selected</h4>`
        return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
        const fileContent = e.target.result
        fileData = fileContent
                        .split(/[\r\n]+/)
                        .map(row => row.split(','))
                        .map((val, index, array) => {
                            if (index == 0) return

                            if (val.every(cell => cell.trim() === "")) return
                            
                            const obj = {}
                        
                            for (let i = 0; i < array[0].length; i++) {
                                if (val[i] !== undefined && val[i] !== null) {
                                    obj[array[0][i]] = val[i].trim()
                                }
                            }
                            return obj
                        })
                        .filter(obj => obj)
        fileData.shift()

        let previewedTable = `
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
                <tr class="bg-gray-100 border-b border-gray-200">
        `

        for (const key in fileData[0]) {
            previewedTable += `<td class="py-2 px-4 text-left text-sm font-medium text-gray-600">${key}</td>`
        }

        previewedTable += `
                </tr>
            </thead>
            <tbody>
        `

        for (const row of fileData) {
            previewedTable += `<tr class="border-b hover:bg-gray-50">`
            for (const item of Object.values(row)) {
                previewedTable += `<td class="py-2 px-4 text-sm text-gray-700">${item}</td>`
            }
            previewedTable += `</tr>`
        }
        previewedTable += `</tbody>`

        previewData.innerHTML = previewedTable

        featureSelect.innerHTML = ''
        labelSelect.innerHTML = ''
        featureCheckbox.innerHTML = ''
        for (const key in fileData[0]) {
            featureSelect.innerHTML += `<option value="${key}">${key}</option>`
            labelSelect.innerHTML += `<option value="${key}">${key}</option>`
            featureCheckbox.innerHTML += `
                <label class="flex items-center text-gray-700">
                    <input type="checkbox" name="features" class="mr-2 leading-tight">
                    ${key}
                </label>`
        }
    }

    reader.readAsText(file)

    btnPreviewData.setAttribute('disabled', true)
    btnNext.removeAttribute('disabled')
    this.reset()
})



inputFile.addEventListener('change', function() {
    const file = this.files[0]
    if (file) {
        fileName.textContent = file.name
    }

    btnPreviewData.removeAttribute('disabled')
})





//////////////////////////////////////////////////
//// SECOND SECTION SCRIPT
//////////////////////////////////////////////////


modelSelection.addEventListener('change', function(e) {
    const model = e.target.value

    switch (model) {
        case 'single': showSingleFeatureForm(); break;
        case 'multi': showMultiFeatureForm(); break;
        default: alert('Invalid model type!'); break;
    }
})


function showSingleFeatureForm() {
    if (featureCheckboxContainer.classList.contains('flex')) {
        featureCheckboxContainer.classList.remove('flex')
        featureCheckboxContainer.classList.add('hidden')

        featureCheckbox.querySelectorAll('input[type="checkbox"')
                        .forEach(checkbox => {
                            checkbox.disabled = true
                        })
    }

    featureSelectionContainer.classList.remove('hidden')
    featureSelectionContainer.classList.add('block')
    featureSelect.disabled = false

    labelSelectionContainer.classList.remove('hidden')
}


function showMultiFeatureForm() {
    if (featureSelectionContainer.classList.contains('block')) {
        featureSelectionContainer.classList.remove('block')
        featureSelectionContainer.classList.add('hidden')
        featureSelect.disabled = true
    }

    featureCheckboxContainer.classList.remove('hidden')
    featureCheckboxContainer.classList.add('flex')
    featureCheckbox.querySelectorAll('input[type="checkbox"')
                    .forEach(checkbox => {
                        checkbox.disabled = false
                    })

    labelSelectionContainer.classList.remove('hidden')
}


modelForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const formData = new FormData(this)

    const model = formData.get('model')
    const label = formData.get('label')
    const feature = formData.get('features') || formData.get('feature')

    switch (model) {
        case 'single': singleFeatureProcess(feature, label); break;
        case 'multi': multiFeatureProcess(feature, label); break;
        default: alert('Invalid model type!'); break;
    }
})


/**
 * Process linear regression with single feature
 * 
 * Formula
 * `y = β0 ​+ β1​x1`
 * 
 * @param {string} feature 
 * @param {string} label 
 */
function singleFeatureProcess(feature, label) {
    const sumX = fileData.reduce((sum, val) => sum + parseFloat(val[feature]), 0)
    const sumY = fileData.reduce((sum, val) => sum + parseFloat(val[label]), 0)
    const sumXY = fileData.reduce((sum, val) => sum + (parseFloat(val[feature]) * parseFloat(val[label])), 0)
    const sumXSquared = fileData.reduce((sum, val) => sum + parseFloat(val[feature]) ** 2, 0)
    const sumXTimesSumY = sumX * sumY

    const b = (
        ((fileData.length * sumXY) - sumXTimesSumY) /
        ((fileData.length * sumXSquared) - (sumX ** 2))
    )

    const a = (sumY / fileData.length) - (b * (sumX / fileData.length))

    equation = (x) => a + (b * x)

    equationResultContainer.classList.remove('hidden')
    equationResultContainer.classList.add('flex')
    equationResult.textContent = `y = ${a} + ${b}x`

    visualize(feature, label)
}


/**
 * Process linear regression with multi feature
 * 
 * Formula
 * `y = β0 ​+ β1​x1 ​+ β2​x2 ​+ ... + βn​xn​`
 * 
 * @param {string[]} features 
 * @param {string} label 
 */
function multiFeatureProcess(features, label) {
    console.log('hey its me multi')
    console.log(fileData)
}


btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(equationResult.textContent).then(() => {
        alert('Copied to clipboard!')
    }).catch(err => {
        console.error(err)
        alert('Failed to copy text!')
    })
})


//////////////////////////////////////////////////
//// THIRD SECTION SCRIPT
//////////////////////////////////////////////////

function visualize(feature, label) {
    if (chartInstance) chartInstance.destroy()

    const chart = document.getElementById('chart')
    const ctx = chart.getContext('2d')


    const featureArray = fileData.map(val => val[feature])
    const maxFeatureSampleData = Math.max(...featureArray)
    const minFeatureSampleData = Math.min(...featureArray)

    const data = {
        datasets: [{
            label: 'Scatter Dataset',
            data: fileData.map(val => {
                return {
                    x: val[feature],
                    y: val[label]
                }
            }),
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        },
        {
            label: `Line ${equationResult.textContent}`,
            data: [
                { x: minFeatureSampleData, y: equation(minFeatureSampleData) },
                { x: maxFeatureSampleData, y: equation(maxFeatureSampleData) }
            ],
            type: 'line',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0
        }]
    }

    const config = {
        type: 'scatter',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        beginAtZero: true
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    }

    chartInstance = new Chart(ctx, config)
}



//////////////////////////////////////////////////
//// FOURTH SECTION SCRIPT
//////////////////////////////////////////////////

const testForm = document.getElementById('test-form')
const predictionResultContainer = document.getElementById('prediction-result-container')
const predictionResult = document.getElementById('prediction-result')

testForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const formData = new FormData(this)

    const input = formData.get('input')

    predictionResultContainer.classList.remove('hidden')
    predictionResultContainer.classList.add('flex')
    predictionResult.textContent = equation(parseFloat(input))
})
