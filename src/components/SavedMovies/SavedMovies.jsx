import { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import "./SavedMovies.css";

function SavedMovies({
  moviesData,
  filteredMoviesFavorites,
  searchSavedMovies,
  setSearchSavedMovies,
  handleFoundMoviesData,
  handleDeleteMovie,
  searchInputValue,
  searchCheckboxValue,
  handleSearchCheckboxValue,
  handleSearchInputValue,
  nothingFound,
  setNothingFound,
}) {
  const [renderFilms, setRenderFilms] = useState([]);
  const [shouldFilter, setShouldFilter] = useState(false);

  useEffect(() => {
    if (searchCheckboxValue) {
      setRenderFilms(moviesData.filter((item) => item.duration <= 40));
    } else {
      setRenderFilms(moviesData);
    }
  }, [searchCheckboxValue]);

  useEffect(() => {
    if (shouldFilter) {
      setRenderFilms(moviesData.filter((item) => item.duration <= 40));
    } else {
      setRenderFilms(moviesData);
    }
  }, [shouldFilter, moviesData]);

  return (
    <div className="movies">
      <Navigation logined />
      <SearchForm
        movies={moviesData}
        inputValue={searchInputValue}
        checkboxValue={searchCheckboxValue}
        setSearchSavedMovies={setSearchSavedMovies}
        handleFoundMoviesData={handleFoundMoviesData}
        handleSearchInputValue={handleSearchInputValue}
        handleSearchCheckboxValue={handleSearchCheckboxValue}
        setNothingFound={setNothingFound}
      />
      <MoviesCardList
        movies={renderFilms}
        filteredMoviesFavorites={filteredMoviesFavorites}
        searchSavedMovies={searchSavedMovies}
        deleteMovie={handleDeleteMovie}
        nothingFound={nothingFound}
      />
      <Footer />
    </div>
  );
}

export default SavedMovies;
