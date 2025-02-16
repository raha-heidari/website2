const apiKey = "c5ef6c82d2173e738bd926a00dbc841d"
const base__URL = "https://api.themoviedb.org/3"



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", searchCelebrity);
    getCelebrityData("Brad Pitt"); 
});

async function getCelebrityData(name) {
    try {
     
        const searchResponse = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${name}&language=en`);
        const searchData = await searchResponse.json();

        if (!searchData.results.length) {
            alert("Celebrity not found!");
            return;
        }

        const celebrityId = searchData.results[0].id;

        
        const response = await fetch(`https://api.themoviedb.org/3/person/${celebrityId}?api_key=${apiKey}&language=en`);
        const data = await response.json();

       
        createCelebrityPage(data);
    } catch (error) {
        console.error("Error fetching celebrity data:", error);
    }
}

function createCelebrityPage(data) {
    const container = document.getElementById("celebrity-container");
    container.innerHTML = ""; 

    const row = document.createElement("div");
    row.className = "row";

    const imgCol = document.createElement("div");
    imgCol.className = "col-md-4";
    const img = document.createElement("img");
    img.src = data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : "placeholder.jpg";
    img.className = "img-fluid rounded";
    img.alt = data.name;
    imgCol.appendChild(img);

    const infoCol = document.createElement("div");
    infoCol.className = "col-md-8";
    const name = document.createElement("h1");
    name.classList.add("namee")
    name.textContent = data.name;
    const bio = document.createElement("p");
    bio.classList.add("bioo")
    bio.textContent = data.biography || "No biography available.";
    infoCol.append(name, bio);

    row.append(imgCol, infoCol);
    container.appendChild(row);

    
    getCelebrityMovies(data.id);
}

async function getCelebrityMovies(celebrityId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${celebrityId}/movie_credits?api_key=${apiKey}&language=en`);
        const data = await response.json();

        const container = document.getElementById("celebrity-container");
        const title = document.createElement("h3");
        title.classList.add("titll")
        title.textContent = "Popular Movies";
        container.appendChild(title);

        const movieRow = document.createElement("div");
        movieRow.className = "row row-cols-1 row-cols-md-4 g-4";

        data.cast.slice(0, 8).forEach(movie => {
            if (!movie.poster_path) return; 

            const col = document.createElement("div");
            col.className = "col";
            const card = document.createElement("div");
            card.className = "card";
            card.classList.add("cardd")

            const img = document.createElement("img");
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.className = "card-img-top";
            img.alt = movie.title;

            const body = document.createElement("div");
            body.className = "card-body";
            const title = document.createElement("h5");
            title.className = "card-title";
            title.textContent = movie.title;

            body.appendChild(title);
            card.append(img, body);
            col.appendChild(card);
            movieRow.appendChild(col);
        });

        container.appendChild(movieRow);
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

function searchCelebrity() {
    const input = document.getElementById("searchInput").value;
    if (!input) {
        alert("Please enter a celebrity name!");
        return;
    }
    getCelebrityData(input)}
   
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



