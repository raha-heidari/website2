const API_KEY = 'c5ef6c82d2173e738bd926a00dbc841d'; 
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let index = 0;
const slideWidth = 210; 


async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayMovies(data.results.slice(0, 35));
    } catch (error) {
        console.error("Errorr", error);
    }
}


function displayMovies(movies) {
    slider.innerHTML = ''; 
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        img.alt = movie.title;

        const title = document.createElement('p');
        title.textContent = movie.title;

        movieCard.appendChild(img);
        movieCard.appendChild(title);
        slider.appendChild(movieCard);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const sliderr = document.querySelector('.slider-container');

    const scrollAmount = 220; 

    function checkButtons() {
        prevBtn.disabled = sliderr.scrollLeft <= 0;
        nextBtn.disabled = sliderr.scrollLeft + sliderr.clientWidth >= sliderr.scrollWidth;
    }

    nextBtn.addEventListener("click", function () {
        sliderr.scrollLeft += scrollAmount;
        setTimeout(checkButtons, 100);
    });

    prevBtn.addEventListener("click", function () {
        sliderr.scrollLeft -= scrollAmount;
        setTimeout(checkButtons, 100);
    });

    
    checkButtons();
});



fetchMovies();

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector(".email-input");
    const emailBtn = document.querySelector(".email-btn");

    emailBtn.addEventListener("click", function () {
        if (emailInput.value.trim() === "") {
            alert("Please enter your email.");
        } else {
            alert("Thank you for subscribing!");
            emailInput.value = ""; 
        }
    });
});