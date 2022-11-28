// Get quotes From API

async function getQuotes() {


endpointURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

const quote = document.querySelector('#quote');
const author = document.querySelector('#author');

const quotes = fetch(endpointURL)
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.error(e));


    
console.log(quotes);
}