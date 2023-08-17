import { Link, useLocation } from "react-router-dom";
import film1 from "../../../images/film1.svg";
import "./MoviesCard.css";

function MoviesCard() {
  const location = useLocation().pathname;

  function handleClickLikeCard(event) {
    const cardButton = event.target;
    cardButton.classList.toggle('movies__favorites-button_active');
  }

  function handleClickDeleteCard(event) {
    const cardButton = event.target;
    cardButton.closest('.movies__card').remove();
  }

  return (
    <div className="movies__card">
      <div className="movies__content">
        <h3 className="movies__name">33 слова о дизайне</h3>
        <span className="movies__duration">1ч 47м</span>
        <Link className="movies__link" to="" target="_blank">
        <img className="movies__image" src={film1} alt="Фильм" />
      </Link>
      </div>
      {
        location !== "/saved-movies" ?
          <button
            className="movies__favorites-button"
            onClick={handleClickLikeCard}
          />
        :
          <button
            className="movies__favorites-button movies__remove-button"
            onClick={handleClickDeleteCard}
          />
      }
    </div>
  );
}

export default MoviesCard;
