const apiKey = "c5ef6c82d2173e738bd926a00dbc841d"
const base__URL = "https://api.themoviedb.org/3"

 const genreContainer = document.querySelector("#genre-container");
  const moviesContainer = document.querySelector("#movies-container");

    async function getGenres() { 
        try {
             const response = await fetch(`${base__URL}/genre/movie/list?api_key=${apiKey}`); 
        const data = await response.json();
         if (data.genres) 
            { displayGenres(data.genres); } }
          catch (error) 
          { console.log("Errorr", error); } 
        }

           function displayGenres(genres)
            {
                const excluded = ["Romance", "Documentary", "Science Fiction", "War", "Western"]
                 genreContainer.innerHTML = ""; 
                
                 genres.forEach(genre => { 
                   if(excluded.includes(genre.name)){return}
                    const genreCard = document.createElement("button");
                     genreCard.classList.add("genre-card"); 
                     genreCard.setAttribute("data-genre-id", genre.id);
                      genreCard.textContent = genre.name; 
                      genreCard.addEventListener("click", () => getMoviesByGenre(genre.id)); 
                      genreContainer.appendChild(genreCard); }); 
                 }

                    async function getMoviesByGenre(genreId) 
                    { 
                        try { const response = await fetch(`${base__URL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`); 
                        const data = await response.json();
                         if (data.results) 
                            { displayMovies(data.results); } 
                        } catch (error) 
                        { console.log("Error", error); } 
                    }

                      function displayMovies(movies) 
                      { 
                        moviesContainer.innerHTML = ""; 

                        moviesContainer.classList.remove("hidden")
                        document.querySelector(".selected").classList.remove("hidden")

                         movies.forEach(movie => { 
                            const movieCard = document.createElement("div");
                             movieCard.classList.add("movie-card");
                              movieCard.setAttribute("data-movie-id", movie.id); 
                              const moviePoster = document.createElement("img"); 
                              moviePoster.classList.add("movie-poster");
                               moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`; moviePoster.alt = movie.title; 
                                const movieTitle = document.createElement("h3");
                                 movieTitle.classList.add("movie-title"); 
                                 movieTitle.textContent = movie.title; 
                                 const movieRating = document.createElement("p");
                            movieRating.classList.add("movie-rating"); 
                            
                            movieRating.textContent = `⭐️ ${movie.vote_average}`; 
                            movieCard.appendChild(moviePoster); 
                            movieCard.appendChild(movieTitle);
                            movieCard.appendChild(movieRating); 
                            moviesContainer.appendChild(movieCard)})
                         }

                         document.addEventListener("DOMContentLoaded", getGenres)

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
                                