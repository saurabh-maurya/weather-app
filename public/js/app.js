console.log('client-side Script loaded succesfully')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const result = document.querySelector('.result')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    result.innerHTML = '<h3>Loading........</h3>'

    console.log(searchElement.value)
    fetch('http://localhost:3000/weather?address='+searchElement.value).then((resoponse) => {
        resoponse.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                result.innerHTML = '<h3>'+data.error+'</h3>'
            } else {
                console.log(data)
                result.innerHTML = '<h3>'+data.location+'</h3><h4>'+data.forecast+'</h4>'
            }
        })
    })
})