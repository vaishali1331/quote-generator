const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showloadingspinner(){
    loader.hidden =false;
    quoteContainer.hidden= true;
}

function removeloadingspinner(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

//get quote from api
async function getQuote() {
    showloadingspinner();
    const proxyUrl='https://mighty-everglades-91894.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data= await response.json();
        // if no author then unknown
        if(data.quoteAuthor===''){
            authorText.innerText ='Unknown';
        }
        else{
            authorText.innerText= data.quoteAuthor;
        }
        //reduce fotn size for long one
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText= data.quoteText;
        removeloadingspinner();
    }catch(error){
        getQuote();
    }
}

//tweet quote
function tweetQuote(){
    const quote= quoteText.innerText;
    const author= authorText.innerText;
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on load
getQuote();