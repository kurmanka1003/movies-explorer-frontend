class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getJson);
  }

  getMoviesFavorites() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getJson);
  }

  addMovieFavorite(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `https://api.nomoreparties.co/${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      }),
    }).then(this._getJson);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJson);
  }

  updateUserData(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(this._getJson);
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.filmfinder.nomoreparties.sbs",
  headers: {
    authorization: "",
    "Content-Type": "application/json",
  },
});

export default mainApi;
