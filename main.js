const artworks = [
    {
        id: 1,
        title: "Lionel Messi",
        match: "Barcelona vs Bayern Munich",
        year: 2015,
        image: "https://www.si.com/.image/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/MTY4MTcyMjc1Mzk1Mjc0MTEy/messi-boateng-goal-ucljpg.jpg",
        description: "The iconic moment when Messi left Boateng on the ground during the Champions League semi-final. This dribble became one of the most memorable moments in football history.",
        likes: 308234,
        stats: {
            goals: 672,
            assists: 303,
            matches: 778
        }
    },
    {
        id: 2,
        title: "Cristiano Ronaldo",
        match: "Juventus vs Real Madrid",
        year: 2018,
        image: "https://img.lemde.fr/2018/07/10/0/0/4337/2891/800/0/75/0/7d71e2e_5962029-01-06.jpg",
        description: "Ronaldo's incredible bicycle kick against Juventus in the Champions League quarter-final. A moment of pure athleticism that earned him a standing ovation from the opposition fans.",
        likes: 298189,
        stats: {
            goals: 701,
            assists: 223,
            matches: 949
        }
    },
    {
        id: 3,
        title: "Neymar Jr",
        match: "Brazil National Team",
        year: 2022,
        image: "https://cdn.prod.website-files.com/624377e20c9e225e2e55e2ed/66aa8b608dba8a679cee06cd_USATSI_19496689%20(1)-p-800.jpg",
        description: "Neymar representing Brazil in the World Cup, showcasing his incredible skills and flair that have made him one of football's most entertaining players.",
        likes: 195312,
        stats: {
            goals: 293,
            assists: 194,
            matches: 497
        }
    }
];

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

shareButton.addEventListener('click', async () => {
    try {
        await navigator.share({
            title: artworks[currentIndex].title,
            text: `Check out this amazing moment of ${artworks[currentIndex].title}!`,
            url: window.location.href
        });
    } catch (error) {
        console.log('Sharing failed', error);
    }
});

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            prevButton.click();
            break;
        case 'ArrowRight':
            nextButton.click();
            break;
        case 'i':
            infoButton.click();
            break;
        case 'f':
            fullscreenButton.click();
            break;
        case 'm':
            soundButton.click();
            break;
    }
});

initializeProgressDots();
updateArtwork();