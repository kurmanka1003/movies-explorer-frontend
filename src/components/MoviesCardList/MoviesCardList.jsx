import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MoviesCard from "./MoviesCard/MoviesCard";

import {
  SCREEN_SIZE_DESKTOP,
  SCREEN_SIZE_TABLET,
  SCREEN_MOVIE_COUNT,
  ADDITIONAL_MOVIES,
} from "../../utils/config";

import "./MoviesCardList.css";

function MoviesCardList({
  movies,
  savedMovies,
  searchSavedMovies,
  filteredMoviesFavorites,
  saveMovie,
  deleteMovie,
  nothingFound,
}) {
  const [amountOfMoviesOnPage, setAmountMoviesOnPage] = useState(null);
  const [amountMoviesAddedOnPage, setAmountMoviesAddedOnPage] = useState(null);
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  const location = useLocation().pathname;

  const resizeWindow = () => setWidthWindow(window.innerWidth);

  useEffect(() => {
    if (widthWindow >= SCREEN_SIZE_DESKTOP) {
      setAmountMoviesOnPage(SCREEN_MOVIE_COUNT.desktop);
      setAmountMoviesAddedOnPage(ADDITIONAL_MOVIES.desktop);
    } else if (widthWindow >= SCREEN_SIZE_TABLET) {
      setAmountMoviesOnPage(SCREEN_MOVIE_COUNT.tablet);
      setAmountMoviesAddedOnPage(ADDITIONAL_MOVIES.tablet);
    } else {
      setAmountMoviesOnPage(SCREEN_MOVIE_COUNT.mobile);
      setAmountMoviesAddedOnPage(ADDITIONAL_MOVIES.mobile);
    }
  }, [widthWindow]);

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);

    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  const handleToggleButtonFavorites = (id) => {
    const movieToDelete = savedMovies.find((item) => item.movieId === id);
    return deleteMovie(movieToDelete._id);
  };

  const handleAddMoreMovies = () => {
    setAmountMoviesOnPage(amountOfMoviesOnPage + amountMoviesAddedOnPage);
  };

  const getSearchResult = () => {
    if (location === "/movies") {
      return "Ничего не найдено";
    }

    if (location === "/saved-movies" && movies.length === 0) {
      return "Пока нет сохранённых фильмов";
    }

    if (location === "/saved-movies") {
      return "Ничего не найдено";
    }

    return;
  };

  return (
    <section className="movies__card-list" aria-label="Секция с фильмами">
      <div className="movies__container">
        {nothingFound ? (
          <p className="movies__error-text">{getSearchResult()}</p>
        ) : (
          ""
        )}
        <div className="movies__card-container">
          {searchSavedMovies
            ? filteredMoviesFavorites
                .slice(0, amountOfMoviesOnPage)
                .map((movieData) => (
                  <MoviesCard
                    toggleDeleteFavorites={handleToggleButtonFavorites}
                    key={movieData.id || movieData._id}
                    movie={movieData}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    savedMoviesData={savedMovies}
                  />
                ))
            : movies.length > 0 &&
              movies
                .slice(0, amountOfMoviesOnPage)
                .map((movieData) => (
                  <MoviesCard
                    toggleDeleteFavorites={handleToggleButtonFavorites}
                    key={movieData.id || movieData._id}
                    movie={movieData}
                    saveMovie={saveMovie}
                    deleteMovie={deleteMovie}
                    savedMoviesData={savedMovies}
                  />
                ))}
        </div>
        {movies.length > amountOfMoviesOnPage && (
          <div className="movies__button-container">
            {location !== "/saved-movies" && (
              <button
                className="movies__more-button"
                onClick={handleAddMoreMovies}
              >
                Ещё
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
