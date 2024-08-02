// Quotes data directly in JavaScript
const quotes = [
    {"quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
    {"quote": "Science is a way of thinking much more than it is a body of knowledge.", "author": "Carl Sagan"},
    {"quote": "The important thing is not to stop questioning. Curiosity has its own reason for existing.", "author": "Albert Einstein"},
    {"quote": "Mathematics is the language with which God has written the universe.", "author": "Galileo Galilei"},
    {"quote": "The computer was born to solve problems that did not exist before.", "author": "Bill Gates"},
    {"quote": "In physics, you don’t have to be crazy, but it helps.", "author": "Niels Bohr"},
    {"quote": "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.", "author": "Stephen Hawking"},
    {"quote": "The best way to predict the future is to invent it.", "author": "Alan Kay"},
    {"quote": "We are made of star-stuff. We are a way for the universe to know itself.", "author": "Carl Sagan"},
    {"quote": "You miss 100% of the shots you don’t take.", "author": "Wayne Gretzky"},
    {"quote": "To invent, you need a good imagination and a pile of junk.", "author": "Thomas Edison"},
    {"quote": "Mathematics is the most beautiful and most powerful creation of the human spirit.", "author": "Stefan Banach"},
    {"quote": "All models are wrong, but some are useful.", "author": "George E.P. Box"},
    {"quote": "If you want to go fast, go alone. If you want to go far, go together.", "author": "African Proverb"},
    {"quote": "The scientist is not a person who gives the right answers, he’s one who asks the right questions.", "author": "Claude Lévi-Strauss"},
    {"quote": "The best way to learn is to do.", "author": "Richard Branson"},
    {"quote": "Everything should be made as simple as possible, but not simpler.", "author": "Albert Einstein"},
    {"quote": "The beauty of a living thing is not the atoms that go into it, but the way those atoms are put together.", "author": "Carl Sagan"},
    {"quote": "Technology is anything that wasn’t around when you were born.", "author": "Alan Kay"},
    {"quote": "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.", "author": "Albert Einstein"},
    {"quote": "Mathematics is the queen of the sciences.", "author": "Carl Friedrich Gauss"},
    {"quote": "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.", "author": "Albert Einstein"},
    {"quote": "To understand the universe is to understand yourself.", "author": "Alan Watts"},
    {"quote": "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.", "author": "Charles Darwin"},
    {"quote": "The universe is under no obligation to make sense to you.", "author": "Neil deGrasse Tyson"},
    {"quote": "In mathematics, the art of asking questions is more important than solving problems.", "author": "Georg Cantor"},
    {"quote": "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", "author": "Patrick McKenzie"},
    {"quote": "The real problem is not whether machines think but whether men do.", "author": "B.F. Skinner"},
    {"quote": "Physics is the science of matter and the changes it undergoes.", "author": "Isaac Newton"},
    {"quote": "It is not the answer that enlightens, but the question.", "author": "Eugene Ionesco"},
    {"quote": "Everything is theoretically impossible until it is done.", "author": "Robert A. Heinlein"},
    {"quote": "The best way to have a good idea is to have a lot of ideas.", "author": "Linus Pauling"},
    {"quote": "I have not failed. I've just found 10,000 ways that won't work.", "author": "Thomas Edison"},
    {"quote": "The only limit to our realization of tomorrow is our doubts of today.", "author": "Franklin D. Roosevelt"},
    {"quote": "Genius is one percent inspiration and ninety-nine percent perspiration.", "author": "Thomas Edison"},
    {"quote": "Mathematics is the most beautiful and most powerful creation of the human spirit.", "author": "Stefan Banach"},
    {"quote": "If I have seen further, it is by standing on the shoulders of Giants.", "author": "Isaac Newton"},
    {"quote": "Science is not only a disciple of reason but, also, one of romance and passion.", "author": "Stephen Hawking"},
    {"quote": "The harder I work, the luckier I get.", "author": "Samuel Goldwyn"},
    {"quote": "In science, there are no shortcuts to truth.", "author": "Karl Popper"},
    {"quote": "You don't have to be great to start, but you have to start to be great.", "author": "Zig Ziglar"},
    {"quote": "Without data, you’re just another person with an opinion.", "author": "W. Edwards Deming"},
    {"quote": "We are not just a collection of molecules. We are a collection of stories.", "author": "Neil deGrasse Tyson"},
    {"quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.", "author": "Nelson Mandela"},
    {"quote": "Science is a way of life. It is a perspective on life.", "author": "James Lovelock"},
    {"quote": "There are no secrets that time does not reveal.", "author": "Jean Racine"},
    {"quote": "The mind is everything. What you think you become.", "author": "Buddha"},
    {"quote": "One small step for man, one giant leap for mankind.", "author": "Neil Armstrong"},
    {"quote": "We do not inherit the earth from our ancestors, we borrow it from our children.", "author": "Native American Proverb"},
    {"quote": "The more I learn, the more I realize how much I don’t know.", "author": "Albert Einstein"},
    {"quote": "Mathematics is the music of reason.", "author": "James Joseph Sylvester"},
    {"quote": "A scientist is a person who has the habit of inquiry and the desire to find out.", "author": "Richard Feynman"},
    {"quote": "If you cannot do great things, do small things in a great way.", "author": "Napoleon Hill"},
    {"quote": "The greatest weapon against stress is our ability to choose one thought over another.", "author": "William James"},
    {"quote": "To teach is to learn twice.", "author": "Joseph Joubert"},
    {"quote": "The secret to getting ahead is getting started.", "author": "Mark Twain"},
    {"quote": "The greatest glory is not in never falling, but in rising every time we fall.", "author": "Confucius"},
    {"quote": "Mathematics is the art of explaining the universe.", "author": "Roger Penrose"},
    {"quote": "Science is the belief in the ignorance of experts.", "author": "Richard Feynman"},
    {"quote": "Mathematics is the science of patterns.", "author": "David B. Wilson"},
    {"quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "author": "Albert Schweitzer"},
    {"quote": "In the field of observation, chance favors only the prepared mind.", "author": "Louis Pasteur"},
    {"quote": "The best revenge is massive success.", "author": "Frank Sinatra"},
    {"quote": "Mathematics is a powerful tool for understanding the world.", "author": "Andrew Wiles"},
    {"quote": "If you want to lift yourself up, lift up someone else.", "author": "Booker T. Washington"},
    {"quote": "The pursuit of knowledge is more valuable than the knowledge itself.", "author": "Rumi"},
    {"quote": "Rise above sectional interests and private ambitions... pass from matter to spirit. ‘In the name of the great God, the creator, the sustainer,’ pray the words of Rumi, ‘I dedicate this life to the higher cause.’", "author": "Iqbal"},
    {"quote": "The only thing we have to fear is fear itself.", "author": "Franklin D. Roosevelt"},
    {"quote": "The universe is not only stranger than we imagine, it is stranger than we can imagine.", "author": "Arthur Eddington"},
    {"quote": "The greatest wealth is to live content with little.", "author": "Plato"},
    {"quote": "An investment in knowledge pays the best interest.", "author": "Benjamin Franklin"},
    {"quote": "Mathematics knows no races or geographic boundaries; for mathematics, the cultural world is one country.", "author": "David Hilbert"},
    {"quote": "There is no place like home.", "author": "L. Frank Baum"},
    {"quote": "The best way to predict the future is to create it.", "author": "Peter Drucker"},
    {"quote": "Science does not know its debt to imagination.", "author": "Ralph Waldo Emerson"},
    {"quote": "The measure of intelligence is the ability to change.", "author": "Albert Einstein"},
    {"quote": "It is the mark of an educated mind to be able to entertain a thought without accepting it.", "author": "Aristotle"},
    {"quote": "The greatest mistake you can make in life is to be continually fearing you will make one.", "author": "Elbert Hubbard"},
    {"quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.", "author": "Nelson Mandela"},
    {"quote": "Do not wait to strike till the iron is hot, but make it hot by striking.", "author": "William Butler Yeats"},
    {"quote": "Mathematics is the most beautiful and most powerful creation of the human spirit.", "author": "Stefan Banach"},
    {"quote": "I have not failed. I've just found 10,000 ways that won't work.", "author": "Thomas Edison"},
    {"quote": "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", "author": "Vince Lombardi"},
    {"quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.", "author": "Nelson Mandela"},
    {"quote": "Life is what happens when you're busy making other plans.", "author": "John Lennon"},
    {"quote": "Mathematics is the queen of the sciences and arithmetic the queen of mathematics.", "author": "Carl Friedrich Gauss"},
    {"quote": "To know is nothing at all; to imagine is everything.", "author": "Anatole France"},
    {"quote": "Science is the belief in the ignorance of experts.", "author": "Richard Feynman"},
    {"quote": "The more I learn, the more I realize how much I don’t know.", "author": "Albert Einstein"},
    {"quote": "You have to dream before your dreams can come true.", "author": "A.P.J. Abdul Kalam"},
    {"quote": "To improve is to change; to be perfect is to change often.", "author": "Winston Churchill"},
    {"quote": "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.", "author": "Albert Einstein"},
    {"quote": "The only limit to our realization of tomorrow is our doubts of today.", "author": "Franklin D. Roosevelt"},
    {"quote": "A person who never made a mistake never tried anything new.", "author": "Albert Einstein"},
    {"quote": "The important thing is not to stop questioning. Curiosity has its own reason for existing.", "author": "Albert Einstein"},
    {"quote": "A theory is a tool for understanding the world. Theories that are not useful are discarded.", "author": "Richard Dawkins"},
    {"quote": "You can't cross the sea merely by standing and staring at the water.", "author": "Rabindranath Tagore"},
    {"quote": "Science is the great antidote to the poison of enthusiasm and superstition.", "author": "Adam Smith"},
    {"quote": "In science, there are no shortcuts to truth.", "author": "Karl Popper"},
    {"quote": "All our knowledge has its origins in our perceptions.", "author": "Leonardo da Vinci"},
    {"quote": "The more we know, the more we realize how much we don't know.", "author": "Neil deGrasse Tyson"},
    {"quote": "The highest form of ignorance is when you reject something you don't know anything about.", "author": "Wayne Dyer"},
    {"quote": "The mind that opens to a new idea never returns to its original size.", "author": "Albert Einstein"},
    {"quote": "The journey of a thousand miles begins with one step.", "author": "Lao Tzu"},
    {"quote": "Imagination is more important than knowledge.", "author": "Albert Einstein"},
    {"quote": "The best way to predict the future is to invent it.", "author": "Alan Kay"},
    {"quote": "You can’t build a reputation on what you are going to do.", "author": "Henry Ford"},
    {"quote": "The measure of intelligence is the ability to change.", "author": "Albert Einstein"},
    {"quote": "The important thing is not to stop questioning. Curiosity has its own reason for existing.", "author": "Albert Einstein"},
    {"quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs"}
];

function displayRandomQuote() {
    // Select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote and author with separate clickable elements
    const quoteElement = document.getElementById('quote');
    quoteElement.innerHTML = `
        <span id="quoteText" style="cursor: pointer;">"${randomQuote.quote}"</span> 
        <span id="quoteAuthor" style="cursor: pointer;">- ${randomQuote.author}</span>
    `;

    // Add click event listener for the quote text
    document.getElementById('quoteText').onclick = function() {
        // Create a search query using the quote
        const query = `${randomQuote.quote}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        // Open the search results in a new tab
        window.open(searchUrl, '_blank');
    };

    // Add click event listener for the author name
    document.getElementById('quoteAuthor').onclick = function() {
        // Create a search query using the author's name
        const query = `${randomQuote.author}`;
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        // Open the search results in a new tab
        window.open(searchUrl, '_blank');
    };
}

window.onload = displayRandomQuote;
