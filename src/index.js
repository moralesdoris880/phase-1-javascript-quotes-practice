const quoteUl = document.querySelector('#quote-list')
const form = document.querySelector('#new-quote-form')
const url = 'http://localhost:3000/quotes'

document.addEventListener('DOMContentLoaded', function() {
  

    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(r => r.json())
    .then(data => {
        addQuote(data)
    })
})

function addQuote(data) {
    data.forEach(quote => {
    let likes = quote.likes.filter(like => like.id = quote.id)
    console.log(likes)
    const li = document.createElement('li')
    li.className = 'quote-card'
    li.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
    `
    
    quoteUl.appendChild(li)

    li.querySelector('.btn-danger').addEventListener('click', () =>{
        li.remove()
        deleteQuote(quote.id)
    })
    li.querySelector('.btn-success').addEventListener('click', ()=>{
        console.log('click')
        let likes = parseInt(li.querySelector('span').innerText) 
        li.querySelector('span').innerText = likes + 1

        fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quoteId: parseInt(`${quote.id}`),
            })
        })
        .then(r=>r.json())
        .then(like => console.log(like))

    }) 
    })
}