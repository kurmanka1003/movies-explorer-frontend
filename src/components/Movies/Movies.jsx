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
  searchInputValue,
  searchCheckboxValue,
  handleFoundMoviesData,
  handleSearchCheckboxValue,
  handleShortFoundMovies,
  handleCheckFoundMovies,
  handleDeleteMovie,
  nothingFound,
  setNothingFound,
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
        handleCheckFoundMovies={handleCheckFoundMovies}
        handleFoundMoviesData={handleFoundMoviesData}
        handleSearchCheckboxValue={handleSearchCheckboxValue}
        handleShortFoundMovies={handleShortFoundMovies}
        setNothingFound={setNothingFound}
      />
      <MoviesCardList
        movies={foundMoviesData}
        savedMovies={savedMoviesData}
        shortFoundMovies={shortFoundMovies}
        checkboxValue={searchCheckboxValue}
        saveMovie={saveMovie}
        deleteMovie={handleDeleteMovie}
        handleFoundMoviesData={handleFoundMoviesData}
        nothingFound={nothingFound}
      />
      <Footer />
    </div>
  );
}

export default Movies;
