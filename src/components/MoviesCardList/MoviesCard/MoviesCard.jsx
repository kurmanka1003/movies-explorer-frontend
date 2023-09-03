import { Link, useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard({
  movie,
  deleteMovie,
  saveMovie,
  savedMoviesData,
  toggleDeleteFavorites,
}) {
  const location = useLocation().pathname;

  const isMovieOnFavorites = savedMoviesData?.some(
    (item) => item.movieId === movie.id
  );

  const durationHours = Math.floor(movie.duration / 60);
  const durationMinutes = movie.duration % 60;

  const linkImage =
    location === "/saved-movies"
      ? movie.image
      : `https://api.nomoreparties.co/${movie.image.url}`;

  const toggleFavoritesButton = () =>
    isMovieOnFavorites ? toggleDeleteFavorites(movie.id) : saveMovie(movie);

  return (
    <div className="movies__card">
      <div className="movies__content">
        <h3 className="movies__name">{movie.nameRU}</h3>
        <span className="movies__duration">{`${durationHours}ч ${durationMinutes}м`}</span>
        <Link className="movies__link" to={movie.trailerLink} target="_blank">
          <img
            className="movies__image"
            src={linkImage}
            alt={`Фильм - ${movie.nameRU}`}
          />
        </Link>
      </div>
      {location !== "/saved-movies" ? (
        <button
          className={`movies__favorites-button ${
            isMovieOnFavorites ? "movies__favorites-button_active" : ""
          }`}
          onClick={toggleFavoritesButton}
        />
      ) : (
        <button
          className="movies__favorites-button movies__remove-button"
          onClick={() => deleteMovie(movie._id)}
        />
      )}
    </div>
  );
}

export default MoviesCard;
