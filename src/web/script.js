const dataForm = document.getElementById('data-form')
const inputFile = document.getElementById('input-file')
const fileName = document.getElementById('file-name')
const btnPreviewData = document.getElementById('btn-preview-data')
const previewData = document.getElementById('preview-data-container')




let currentSection = 1


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
        const rows = fileContent.split(/[\r\n]+/).map(row => row.split(','))
        
        let previewedTable = `
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
                <tr class="bg-gray-100 border-b border-gray-200">
        `

        for (const item of rows.shift()) {
            previewedTable += `<td class="py-2 px-4 text-left text-sm font-medium text-gray-600">${item}</td>`
        }

        previewedTable += `
                </tr>
            </thead>
        `

        for (const row of rows) {
            previewedTable += `<tr class="border-b hover:bg-gray-50">`
            for (const item of row) {
                previewedTable += `<td class="py-2 px-4 text-sm text-gray-700">${item}</td>`
            }
            previewedTable += `</tr>`

        }

        previewData.innerHTML = previewedTable
    }

    reader.readAsText(file)

    btnPreviewData.setAttribute('disabled', true)
    this.reset()
})



inputFile.addEventListener('change', function() {
    const file = this.files[0]
    if (file) {
        fileName.textContent = file.name
    }

    btnPreviewData.removeAttribute('disabled')
})