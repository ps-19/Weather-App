console.log('Client-Side Javascript File Linked Successfully !!')

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne= document.querySelector('#messageOne')
const messagetwo= document.querySelector('#messageTwo')

messageOne.textContent = ''
messagetwo.textContent = ''


weatherForm.addEventListener('submit',(e) => {  // e -> event
    e.preventDefault()
    const Location = search.value
    
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''

    const url = "http://localhost:3000/weather?address="+Location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }
            else{
                // console.log(data.data2)
                messagetwo.textContent = 'data'
            }
        })
    })

})