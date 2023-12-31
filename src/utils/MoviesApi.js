const getJson = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getMovies = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getJson);
};
