const quoteContainer = document.querySelector("#quote-container");
const quoteTextContainer = document.querySelector(".quote-text");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const newQuoteButton = document.querySelector("#new-quote");
const twitterButton = document.querySelector("#twitter");
const loader = document.querySelector("#loader");

const maxQuoteLength = 70;

let apiQuotes;

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function notLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

/**
 * @dev gets all the quotes from the specified API. Calls all the other functions.
 */
async function getQuotes() {
  try {
    const endpointURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    loading();
    const response = await fetch(endpointURL);
    apiQuotes = await response.json();
    const quote = getQuote();
    setQuote(quote);
    setTweetButtonLink(quote);
    notLoading();
  } catch {
    (e) => console.error(e);
  }
}

/**
 * @dev gets a single quote from the global quotes array *
 * @returns a quote object
 */
function getQuote() {
  const randQuoteIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randQuoteIndex];
  return quote;
}

/**
 * @dev Sets the quote text and author in the corresponding HTML elements
 * @param quote Quote object with two keys, text and author
 */
function setQuote(quote) {
  if (quote.text.length > maxQuoteLength) {
    quoteTextContainer.classList.add("long-quote");
  } else {
    quoteTextContainer.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  authorText.textContent = quote.author || "Unknown";
}

/**
 * @dev Sets the link and its href on the Twitter button
 * @param {*} quote Quote object with two keys, text and author
 */
function setTweetButtonLink(quote) {
  const tweetLink = document.createElement("a");
  const linkHref = `https://twitter.com/intent/tweet?text=${quote.text} [${quote.author}]`;
  tweetLink.setAttribute("href", linkHref);

  twitterButton.parentNode.insertBefore(tweetLink, twitterButton);
  tweetLink.appendChild(twitterButton);
}

// Gets a new quote on the page
newQuoteButton.addEventListener("click", getQuotes);

// On Load
getQuotes();
