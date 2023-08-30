import { useState } from "react";

import Navigation from "../Navigation/Navigation";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import "./SavedMovies.css";

function SavedMovies({
  moviesData,
  filteredMoviesFavorites,
  searchSavedMovies,
  setSearchSavedMovies,
  searchResult,
  setSearchResult,
  handleFoundMoviesData,
  handleDeleteMovie,
}) {
  const [favoriteInput, setFavoriteInput] = useState("");
  const [favoriteCheckbox, setFavoriteCheckbox] = useState(false);

  return (
    <div className="movies">
      <Navigation logined />
      <SearchForm
        movies={moviesData}
        inputValue={favoriteInput}
        checkboxValue={favoriteCheckbox}
        setSearchResult={setSearchResult}
        setSearchSavedMovies={setSearchSavedMovies}
        handleFoundMoviesData={handleFoundMoviesData}
        handleSearchInputValue={setFavoriteInput}
        handleSearchCheckboxValue={setFavoriteCheckbox}
      />
      <MoviesCardList
        movies={moviesData}
        filteredMoviesFavorites={filteredMoviesFavorites}
        searchResult={searchResult}
        searchSavedMovies={searchSavedMovies}
        deleteMovie={handleDeleteMovie}
      />
      <Footer />
    </div>
  );
}

export default SavedMovies;
