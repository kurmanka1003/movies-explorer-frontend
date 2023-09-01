import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import { getMovies } from "../../utils/MoviesApi";
import { getContent, register, authorize, logout } from "../../utils/AuthApi";
import mainApi from "../../utils/MainApi";

import CurrentUserContext from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoggedProtectedRoute from "../LoggedProtectedRoute/LoggedProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../AuthForm/Register/Register";
import Login from "../AuthForm/Login/Login";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMoviesData, setSavedMoviesData] = useState([]);
  const [filteredMoviesFavorites, setFilteredFavoriteMovies] = useState([]);
  const [shortFoundMovies, setShortFoundMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState(false);
  const [сheckbox, setCheckbox] = useState(false);
  const [preloader, setPreloader] = useState(true);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [searchResultSavedMovies, setSearchResultSavedMovies] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [favoriteInput, setFavoriteInput] = useState("");
  const [favoriteCheckbox, setFavoriteCheckbox] = useState(false);
  const [nothingFound, setNothingFound] = useState(false); 

  const location = useLocation().pathname;

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserData(), getMovies()])
        .then(([user, moviesData]) => {
          setPreloader(true);
          setCurrentUser(user);
          setMovies(moviesData);
        })
        .catch((err) => console.log(err))
        .finally(() => setPreloader(false));
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setPreloader(false);
    } else {
      getContent(jwt)
        .then(() => {
          mainApi.setToken(jwt);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err))
        .finally(() => setPreloader(false));
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogin(email, password) {
    setPreloader(true);
    authorize(email, password)
      .then((data) => {
        setLoggedIn(true);
        mainApi.setToken(data.jwtToken);
        navigate("/movies", { replace: true });
        setInfoTooltip("Добро пожаловать!");
      })
      .catch((err) => {
        setAuthError(true);
        setInfoTooltip("Что-то пошло не так, попробуйте повторить попытку");
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
        openPopup(true);
      });
  }

  function handleRegister(name, email, password) {
    setPreloader(true);
    register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setAuthError(true);
        setInfoTooltip("Что-то пошло не так, попробуйте повторить попытку");
        openPopup(true);
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  const handleUpdateUser = (newData) => {
    setPreloader(true);
    mainApi
      .updateUserData(newData)
      .then((res) => {
        setCurrentUser(res);
        setInfoTooltip("Информация успешно обновлена");
      })
      .catch((err) => {
        setInfoTooltip("Что-то пошло не так, попробуйте повторить попытку");
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
        openPopup(true);
      });
  };

  const handleSignOut = () => {
    setPreloader(true);
    const jwt = localStorage.getItem("jwt");
    logout(jwt)
      .then(() => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setInfoTooltip("Что-то пошло не так, попробуйте повторить попытку");
        openPopup(true);
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
        localStorage.clear();
      });
  };

  const handleCheckFoundMovies = () => {
    setPreloader(true);
    const localStorageKey =
      location === "/movies" ? "foundmovies" : "savedmovies";
    const foundMovieData = localStorage.getItem(localStorageKey);
    if (!foundMovieData) {
      return setPreloader(false);
    } else {
      const foundData = JSON.parse(foundMovieData);
      setShortFoundMovies(foundData.movies);
      setFoundMovies(foundData.movies);
      setSearchInputValue(foundData.inputValue);
      setCheckbox(foundData.checkboxValue);
      setPreloader(false);
    }
  };

  useEffect(() => {
    if (loggedIn) return handleCheckFoundMovies();
  }, [loggedIn]);

  const handleGetSavedMovies = useCallback(() => {
    setPreloader(true);
    mainApi
      .getMoviesFavorites()
      .then((movies) => {
        const userId = currentUser.data._id;
        const userMovies = movies.data.filter((item) => item.owner === userId);
        setSavedMoviesData(userMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setPreloader(false));
  }, [currentUser]);

  useEffect(() => {
    if (loggedIn) return handleGetSavedMovies();
  }, [handleGetSavedMovies, loggedIn]);

  const handleAddMovieOnFavorites = (movie) => {
    mainApi
      .addMovieFavorite(movie)
      .then((movie) => setSavedMoviesData([movie.data, ...savedMoviesData]))
      .catch((err) => console.log(err));
  };

  const handleDeleteMovieOnFavorites = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setFilteredFavoriteMovies((stateMovie) => {
          return stateMovie.filter((movie) => movie._id !== movieId);
        });
        setSavedMoviesData((stateMovie) => {
          return stateMovie.filter((movie) => movie._id !== movieId);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn) return setFilteredFavoriteMovies(savedMoviesData);
  }, []);

  function openPopup() {
    setIsOpenInfoTooltip(true);
  }

  function closePopup() {
    setIsOpenInfoTooltip(false);
    setInfoTooltip("");
  }

  if (preloader) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/signin"
          element={
            <LoggedProtectedRoute loggedIn={loggedIn}>
              <Login
                logError={authError}
                serLogError={setAuthError}
                handleLogin={handleLogin}
              />
            </LoggedProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <LoggedProtectedRoute loggedIn={loggedIn}>
              <Register
                regError={authError}
                setRegError={setAuthError}
                handleRegister={handleRegister}
              />
            </LoggedProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                moviesData={movies}
                savedMoviesData={savedMoviesData}
                foundMoviesData={foundMovies}
                shortFoundMovies={shortFoundMovies}
                searchCheckboxValue={сheckbox}
                searchInputValue={searchInputValue}
                saveMovie={handleAddMovieOnFavorites}
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                handleCheckFoundMovies={handleCheckFoundMovies}
                handleFoundMoviesData={setFoundMovies}
                handleSearchInputValue={setSearchInputValue}
                handleSearchCheckboxValue={setCheckbox}
                handleDeleteMovie={handleDeleteMovieOnFavorites}
                handleShortFoundMovies={setShortFoundMovies}
                nothingFound = {nothingFound}
                setNothingFound = {setNothingFound}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                moviesData={savedMoviesData}
                handleFoundMoviesData={setFilteredFavoriteMovies}
                handleDeleteMovie={handleDeleteMovieOnFavorites}
                filteredMoviesFavorites={filteredMoviesFavorites}
                searchSavedMovies={searchSavedMovies}
                setSearchSavedMovies={setSearchSavedMovies}
                searchResult={searchResultSavedMovies}
                setSearchResult={setSearchResultSavedMovies}
                searchCheckboxValue={favoriteCheckbox}
                handleSearchCheckboxValue={setFavoriteCheckbox}
                searchInputValue={favoriteInput}
                handleSearchInputValue={setFavoriteInput}
                nothingFound = {nothingFound}
                setNothingFound = {setNothingFound}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                updateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
      <InfoTooltip
        popupTitle={infoTooltip}
        isOpen={isOpenInfoTooltip}
        onClose={closePopup}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
