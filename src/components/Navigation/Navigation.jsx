import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "../../images/logo.svg";
import "./Navigation.css";
import "./BurgerMenu.css";

function Navigation({ logined }) {
  const location = useLocation().pathname;
  const [isToggleBurgerButton, setToggleBurgerButton] = useState(false);

  function handleToggleBurgerButton() {
    setToggleBurgerButton(!isToggleBurgerButton);
  }

  return (
    <header
      className={`navigation ${location === "/" ? "navigation_grey" : ""} ${
        isToggleBurgerButton ? "navigation_opened" : ""
      }`}
    >
      <NavLink to="/">
        <img className="navigation__logo" src={logo} alt="Логотип" />
      </NavLink>
      <div
        className={`navigation__wrapper ${
          isToggleBurgerButton ? "navigation_wrapper_opened" : ""
        }`}
      />
      {logined ? (
        <div className="navigation__container">
          <div className="navigation__movies-container">
            <NavLink
              className="navigation__movie-link navigation__home-link"
              to="/"
              exact="true"
            >
              Главная
            </NavLink>
            <NavLink
              className={(navigdata) => `navigation__movie-link
                    ${
                      navigdata.isActive ? "navigation__movie-link_active" : ""
                    }`}
              to="/movies"
              exact="true"
            >
              Фильмы
            </NavLink>
            <NavLink
              className={(navigdata) => `navigation__movie-link
                    ${
                      navigdata.isActive ? "navigation__movie-link_active" : ""
                    }`}
              to="/saved-movies"
              exact="true"
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="navigation__profile-container">
            <NavLink className="navigation__profile-link" to="/profile">
              <button className="navigation__profile-button">Аккаунт</button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="navigation__authform-container">
          <NavLink className="navigation__link" to="/signup">
            Регистрация
          </NavLink>
          <NavLink
            className="navigation__link navigation__button-link"
            to="/signin"
          >
            Войти
          </NavLink>
        </div>
      )}
      {logined && (
        <button
          className="navigation__burger-button"
          onClick={handleToggleBurgerButton}
        >
          <span className="navigation__burger-line"></span>
          <span className="navigation__burger-line"></span>
          <span className="navigation__burger-line"></span>
        </button>
      )}
    </header>
  );
}

export default Navigation;
