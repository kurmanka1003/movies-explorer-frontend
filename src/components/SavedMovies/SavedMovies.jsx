import Navigation from "../Navigation/Navigation";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import "./SavedMovies.css";

function SavedMovies() {
  return (
    <div className="movies">
      <Navigation logined />
      <SearchForm />
      <MoviesCardList savedMovies/>
      <Footer />
    </div>
  );
}

export default SavedMovies;
