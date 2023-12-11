const populateGenreDropdown = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

const getSelectedGenre = () => {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
};

const clearCurrentMovie = () => {
  const elementIdsToClear = [
    "movie-poster",
    "movie-text",
    "similar-movie-1-poster",
    "similar-movie-1-text",
    "similar-movie-2-poster",
    "similar-movie-2-text",
    "similar-movie-3-poster",
    "similar-movie-3-text"
  ];

  elementIdsToClear.forEach((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = "";
    }
  });
};

const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "movie-poster");

  return posterImg;
};

const createMovieTitle = (title, date) => {
  const titleHeader = document.createElement("h2");
  titleHeader.setAttribute("class", "movie-title");
  titleHeader.setAttribute("id", "movie-title");
  if (date != "") {
    titleHeader.innerHTML = title + ` (${date.substring(0, 4)})`;
  } else {
    titleHeader.innerHTML = title;
  }

  return titleHeader;
};

const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("class", "movie-overview");
  overviewParagraph.setAttribute("id", "movie-overview");
  overviewParagraph.setAttribute("class", "text");
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

const createTagline = (tagline) => {
  const taglineParagraph = document.createElement("p");
  taglineParagraph.setAttribute("id", "tagline");
  taglineParagraph.innerHTML = tagline;

  return taglineParagraph;
};

const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

const displayMovie = (movieInfo, containerId) => {
  const moviePosterDiv = document.getElementById(`${containerId}-poster`);
  const movieTextDiv = document.getElementById(`${containerId}-text`);
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title, movieInfo.release_date);
  const overviewText = createMovieOverview(movieInfo.overview);

  const tagline = movieInfo.tagline ? createTagline(movieInfo.tagline) : null;

  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  if (tagline) {
    movieTextDiv.appendChild(tagline);
  }

  movieTextDiv.appendChild(overviewText);
};

const displaySimilarMovies = (similarMovies) => {
  const title = document.getElementById("similar-movies-title");

  if (similarMovies && similarMovies.length > 0) {
    const numToShow = 3;
    title.style.display = "block";
    for (let i = 0; i < numToShow && i < similarMovies.length; i++) {
      displayMovie(similarMovies[i], `similar-movie-${i + 1}`);
    }
  } else {
    title.style.display = "none";
  }
};
