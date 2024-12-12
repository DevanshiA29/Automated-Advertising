const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');
const body = document.body; // Select the body for background change

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to change the background color dynamically
function changeBackgroundColor() {
  const randomColor = getRandomColor();
  body.style.backgroundColor = randomColor;
}

// Fetch a random quote from the API
async function getQuote() {
  const apiUrl = 'https://api.quotable.io/random';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `- ${data.author}`;
    tweetBtn.href = `https://twitter.com/intent/tweet?text="${data.content}" - ${data.author}`;
    changeBackgroundColor(); // Change the background color when a new quote is loaded
  } catch (error) {
    console.error('Error fetching the quote:', error);
    quoteText.textContent = 'Oops! Could not fetch a quote. Try again later.';
    authorText.textContent = '';
  }
}

// Event listener for the button
newQuoteBtn.addEventListener('click', getQuote);

// Load an initial quote
getQuote();
