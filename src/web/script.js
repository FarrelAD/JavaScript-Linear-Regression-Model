const dataForm = document.getElementById('data-form')
const previewData = document.getElementById('preview-data-container')

dataForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const formData = new FormData(this)
    const file = formData.get('data')

    const reader = new FileReader()

    reader.onload = (e) => {
        const fileContent = e.target.result
        const rows = fileContent.split(/[\r\n]+/).map(row => row.split(','))
        previewData.style.display = 'block'
        
        let previewedTable = `
        <table class="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead class="bg-gray-200 rounded-t-lg">
                <tr>
        `

        for (const item of rows.shift()) {
            previewedTable += `<td class="px-4 py-2 text-left text-sm font-semibold text-gray-700">${item}</td>`
        }

        previewedTable += `
                </tr>
            </thead>
        `

        for (const row of rows) {
            previewedTable += `<tr>`
            for (const item of row) {
                previewedTable += `<td>${item}</td>`
            }
            previewedTable += `</tr>`

        }

        previewData.innerHTML = previewedTable
    }

    reader.readAsText(file)
})