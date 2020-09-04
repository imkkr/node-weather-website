const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

// messageone.textContent = "From JS"

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageFour.textContent=''
    messageThree.textContent=''
    fetch('/weather?address=' + location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            messageFour.textContent=''
            messageThree.textContent=''
        }
        else{
            messageOne.textContent="Location:"+data.location
            messageTwo.textContent = "Weather:"+data.forecast
            messageThree.textContent = "Temperature:"+data.temperature
            messageFour.textContent = "Feels Like:"+data.feels_like
        }
    })
})
})