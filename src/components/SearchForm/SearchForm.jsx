import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";

import { DURATION_SHORT_MOVIE } from "../../utils/config";

import "./SearchForm.css";

function SearchForm({
  movies,
  inputValue,
  foundMoviesData,
  shortFoundMovies,
  checkboxValue,
  handleSearchCheckboxValue,
  handleShortFoundMovies,
  handleFoundMoviesData,
  handleCheckFoundMovies,
  setSearchResult,
  setSearchSavedMovies,
}) {
  const location = useLocation().pathname;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const searchCheckboxRef = useRef(null);
  const searchValidation = useInput(inputValue, { isEmpty: true });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const validEmpty = () =>
    searchValidation.hasChanged && searchValidation.isEmpty;

  const handleDisableButton = () => !searchValidation.inputValid;

  const filterName = (name, searchName) => name.includes(searchName);

  const matchShortMovieCriteria = (movie, movieName, searchNameMovie) => {
    return (
      movie.duration <= DURATION_SHORT_MOVIE &&
      filterName(movieName, searchNameMovie)
    );
  };

  const filterMovies = (moviesData, searchValue, shortMovie) => {
    const searchNameMovie = searchValue.toLowerCase();

    return moviesData.filter((movie) => {
      let movieName = movie.nameRU.toLowerCase();
      if (shortMovie) {
        return matchShortMovieCriteria(movie, movieName, searchNameMovie);
      } else {
        return filterName(movieName, searchNameMovie);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchResult = filterMovies(
      movies,
      searchValidation.value,
      searchCheckboxRef.current.checked
    );
    if (!searchResult) {
      return setSearchResult(false);
    } else {
      setSearchResult(true);
    }
    handleFoundMoviesData(searchResult);

    if (location === "/saved-movies") {
      setSearchSavedMovies(true);
      return;
    }
    localStorage.setItem(
      "foundmovies",
      JSON.stringify({
        inputValue: searchValidation.value,
        checkboxValue: searchCheckboxRef.current.checked,
        movies: searchResult,
      })
    );

    handleShortFoundMovies(searchResult);
    handleCheckFoundMovies();
  };

  const toggleCheckbox = () => {
    handleSearchCheckboxValue(!checkboxValue);
  };

  useEffect(() => {
    if (
      location === "/movies" &&
      checkboxValue &&
      inputValue === searchValidation.value
    ) {
      handleFoundMoviesData(
        foundMoviesData.filter(
          (movie) => movie.duration <= DURATION_SHORT_MOVIE
        )
      );
    } else if (location === "/saved-movies") {
      return;
    } else {
      handleFoundMoviesData(shortFoundMovies);
    }
  }, [checkboxValue, searchValidation.value]);

  return (
    <div className="search">
      {windowWidth > 550 ? (
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            className="search__input"
            type="search"
            placeholder="Фильм"
            onChange={searchValidation.onChange}
            value={searchValidation.value}
            onBlur={searchValidation.onBlur}
          />
          <button
            className="search__submit-button"
            disabled={handleDisableButton()}
          ></button>
          <div className="search__label">
            <input
              className="search__checkbox"
              id="toggle-button"
              type="checkbox"
              onChange={toggleCheckbox}
              checked={checkboxValue}
              ref={searchCheckboxRef}
            />
            <label className="search__text" htmlFor="toggle-button">
              Короткометражки
            </label>
          </div>
          {validEmpty() && (
            <span className="search__error">Нужно ввести ключевое слово</span>
          )}
        </form>
      ) : (
        <div>
          <form className="search__form" onSubmit={handleSubmit}>
            <input
              className="search__input"
              type="search"
              placeholder="Фильм"
              onChange={searchValidation.onChange}
              value={searchValidation.value}
              onBlur={searchValidation.onBlur}
            />
            <button
              className="search__submit-button"
              disabled={handleDisableButton()}
            ></button>
            {validEmpty() && (
              <span className="search__error">Нужно ввести ключевое слово</span>
            )}
          </form>
          <div className="search__label">
            <input
              className="search__checkbox"
              id="toggle-button"
              type="checkbox"
              onChange={toggleCheckbox}
              checked={checkboxValue}
              ref={searchCheckboxRef}
            />
            <label className="search__text" htmlFor="toggle-button">
              Короткометражки
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
