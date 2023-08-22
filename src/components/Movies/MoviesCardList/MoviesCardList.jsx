import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList() {
  const location = useLocation().pathname;

  return (
    <section className="movies__card-list" aria-label="Список фильмов">
      <div className="movies__container">
        <div className="movies__card-container">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </div>
        <div className="movies__button-container">
          {
            location !== '/saved-movies' &&
              <button className="movies__more-button">Ещё</button>
          }
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;
