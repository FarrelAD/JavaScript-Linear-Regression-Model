const dataForm = document.getElementById('data-form')

dataForm.addEventListener('submit', function(e) {
    e.preventDefault()

    console.log('data!')
    console.log(this)
})