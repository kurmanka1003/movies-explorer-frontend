import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies({
  moviesData,
  savedMoviesData,
  foundMoviesData,
  shortFoundMovies,
  saveMovie,
  searchResult,
  setSearchResult,
  searchInputValue,
  searchCheckboxValue,
  handleFoundMoviesData,
  handleSearchInputValue,
  handleSearchCheckboxValue,
  handleShortFoundMovies,
  handleCheckFoundMovies,
  handleDeleteMovie,
}) {
  return (
    <div className="movies">
      <Navigation logined />
      <SearchForm
        movies={moviesData}
        foundMoviesData={foundMoviesData}
        shortFoundMovies={shortFoundMovies}
        inputValue={searchInputValue}
        checkboxValue={searchCheckboxValue}
        setSearchResult={setSearchResult}
        handleCheckFoundMovies={handleCheckFoundMovies}
        handleFoundMoviesData={handleFoundMoviesData}
        handleSearchInputValue={handleSearchInputValue}
        handleSearchCheckboxValue={handleSearchCheckboxValue}
        handleShortFoundMovies={handleShortFoundMovies}
      />
      <MoviesCardList
        movies={foundMoviesData}
        savedMovies={savedMoviesData}
        shortFoundMovies={shortFoundMovies}
        searchResult={searchResult}
        checkboxValue={searchCheckboxValue}
        saveMovie={saveMovie}
        deleteMovie={handleDeleteMovie}
        handleFoundMoviesData={handleFoundMoviesData}
      />
      <Footer />
    </div>
  );
}

export default Movies;
