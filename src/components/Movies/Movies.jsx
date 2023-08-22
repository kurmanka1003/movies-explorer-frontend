import Navigation from "../Navigation/Navigation";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import "./Movies.css";

function Movies() {
  return (
    <div className="movies">
      <Navigation logined />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default Movies;
