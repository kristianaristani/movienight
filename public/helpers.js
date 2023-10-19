// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo,similarMovies) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
  
    showBtns();
    displaySimilarMovies(similarMovies);
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
};

const displaySimilarMovies = (similarMovies) => {
  // Assuming that you have a div element to display similar movies with the id "similarMovies"
  const similarMoviesDiv = document.getElementById('similarMovies');
  
  // Clear any previous similar movie content
  similarMoviesDiv.innerHTML = '';

  if (similarMovies && similarMovies.length > 0) {
    const numToShow = 3; // You can change this number as needed

    for (let i = 0; i < numToShow && i < similarMovies.length; i++) {
      const similarMovie = similarMovies[i];

      // Create HTML elements for each similar movie
      const similarMovieDiv = document.createElement('div');
      similarMovieDiv.classList.add('similarMovie');
      const similarMoviePoster = createMoviePoster(similarMovie.poster_path);
      similarMoviePoster.setAttribute('id', 'moviePoster');
      const similarMovieTitle = document.createElement('h2');
      similarMovieTitle.textContent = similarMovie.title;
      similarMovieTitle.setAttribute('id', 'movieTitle');
      const similarMovieOverview = document.createElement('p');
      similarMovieOverview.setAttribute('id', 'movieOverview')
      similarMovieOverview.textContent = similarMovie.overview;

      // Append similar movie elements to the container div
      similarMovieDiv.appendChild(similarMoviePoster);
      similarMovieDiv.appendChild(similarMovieTitle);
      similarMovieDiv.appendChild(similarMovieOverview);

      // Append the container div to the similarMoviesDiv
      similarMoviesDiv.appendChild(similarMovieDiv);
    }
  }
};
