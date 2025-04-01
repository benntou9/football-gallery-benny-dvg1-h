figma link --> https://www.figma.com/design/81u2eTuE7EGwbkRuqFcdPr/webscrib?node-id=0-1&t=okxv1Kzdueqp78ww-1

Concept

Deze interactieve webpagina toont een digitale voetbalgalerij waarin verschillende profvoetballers centraal staan. Elke slide toont een speler met een afbeelding. Gebruikers kunnen:
	-	Een beschrijving bekijken
	-	Statistieken inzien (wedstrijden, doelpunten, assists)
	-	Interactie ervaren via knoppen, animaties en dynamische content.
    -   je kan de publicatie liken

Gebruikte technieken

HTML
	•	Structuur met <section>, <div>, <button> en <img>-tags.
	•	Duidelijke componenten per speler: afbeelding, beschrijvingsknop, statistiek-gebied.

CSS
	•	Responsieve layout met flexbox of grid om slides goed te tonen op mobiel en desktop.
	•	Transities en hovereffecten voor zachte animaties op knoppen en afbeeldingen.

JavaScript
	•	Tonen/verbergen van beschrijving met een toggle-knop per speler.
	•	Live tonen van statistieken zoals aantal gespeelde wedstrijden, goals en assists.
	•	EventListeners op knoppen om acties te activeren.


AI-tools die ik heb gebruikt
    -  https://chatgpt.com/
    -  https://www.w3schools.com/js/

    w3schools heeft me ook veel geholpen met mijn java

Hier is de code waar ik geen ai heb gebruikt:

const artworkImage = document.getElementById('artworkImage');
const artworkTitle = document.getElementById('artworkTitle');
const artworkMatch = document.getElementById('artworkMatch');
const artworkDescription = document.getElementById('artworkDescription');
const goalsCount = document.getElementById('goalsCount');
const assistsCount = document.getElementById('assistsCount');
const matchesCount = document.getElementById('matchesCount');
const likeCount = document.getElementById('likeCount');
const infoPanel = document.getElementById('infoPanel');
const likeButton = document.getElementById('likeButton');
const infoButton = document.getElementById('infoButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const soundButton = document.getElementById('soundButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const shareButton = document.getElementById('shareButton');
const progressBar = document.querySelector('.progress-dots');

let currentIndex = 0;
let isLiked = new Array(artworks.length).fill(false);
let isMuted = true;
let isFullscreen = false;

function initializeProgressDots() {
    artworks.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `progress-dot ${index === 0 ? 'active' : ''}`;
        progressBar.appendChild(dot);
    });
}

function updateArtwork() {
    const artwork = artworks[currentIndex];
    
    document.querySelector('.artwork').classList.remove('fade-in');
    
    setTimeout(() => {
        artworkImage.src = artwork.image;
        artworkTitle.textContent = artwork.title;
        artworkMatch.textContent = `${artwork.match} - ${artwork.year}`;
        artworkDescription.textContent = artwork.description;
        goalsCount.textContent = artwork.stats.goals;
        assistsCount.textContent = artwork.stats.assists;
        matchesCount.textContent = artwork.stats.matches;
        likeCount.textContent = `${artwork.likes + (isLiked[currentIndex] ? 1 : 0)}`;
        
        likeButton.classList.toggle('liked', isLiked[currentIndex]);
        
        document.querySelectorAll('.progress-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        document.querySelector('.artwork').classList.add('fade-in');
    }, 300);
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    updateArtwork();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % artworks.length;
    updateArtwork();
});

infoButton.addEventListener('click', () => {
    infoPanel.classList.toggle('active');
});

likeButton.addEventListener('click', () => {
    isLiked[currentIndex] = !isLiked[currentIndex];
    likeButton.classList.toggle('liked');
    updateArtwork();
});

soundButton.addEventListener('click', () => {
    isMuted = !isMuted;
    soundButton.querySelector('svg').style.opacity = isMuted ? 0.5 : 1;
});

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        isFullscreen = true;
    } else {
        document.exitFullscreen();
        isFullscreen = false;
    }
});