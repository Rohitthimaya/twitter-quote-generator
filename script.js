const quoteContainer = document.getElementById("quote-container");
const author = document.getElementById("author");
const quote = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quote-btn");
const loader = document.getElementById("loader");
const apiUrl = `https://type.fit/api/quotes`;
let allQuotes = [];

// Show Loader
function showingLoading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

// Hide Loader
function stopLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function getMyQuote() {

    showingLoading();

    // Choosing a Random Quote Fromm allQuotes
    let myQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];

    // If Author is Null then settings its value to Unknown
    if (!myQuote.author) {
        author.textContent = "Unknown";
    } else {
        author.textContent = myQuote.author;
    }

    // If Quote is long reducing the font size
    if (myQuote.text.length >= 120) {
        quote.classList.add("long-quote");
    } else {
        quote.classList.remove("long-quote");
    }
    quote.textContent = myQuote.text;

    //   Tweet Quote
    function tweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${author.textContent} - ${quote.textContent}`;
        window.open(twitterUrl, "_blank");
    }

    //   Adding Event Listener
    twitterBtn.addEventListener("click", tweetQuote);
    newQuoteBtn.addEventListener("click", getMyQuote);

    stopLoading()
}

// Get Quotes From API
async function getQuotes() {
    showingLoading()
    const response = await fetch(apiUrl);
    allQuotes = await response.json();
    try {
        getMyQuote();
    } catch (error) {

    }
}

// On Load
getQuotes();