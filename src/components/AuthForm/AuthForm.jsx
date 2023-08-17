import { NavLink, useLocation } from "react-router-dom";

import logo from "../../images/logo.svg";

import "./AuthForm.css";

function AuthForm({ title, children }) {
  const location = useLocation().pathname;

  return (
    <div className="authform">
      <div className="authform__container">
        <NavLink to="/">
          <img className="authform__logo" src={logo} alt="Логотип" />
        </NavLink>
        <h2 className="authform__title">{title}</h2>
        <form className="authform__form">{children}</form>
        {location === "/signup" ? (
          <button className="authform__button-submit" type="submit">
            Зарегистрироваться
          </button>
        ) : (
          <button className="authform__button-submit" type="submit">
            Войти
          </button>
        )}
        {location === "/signup" ? (
          <div className="authform__link-container">
            <p className="authform__link-text">Уже зарегистрированы?</p>
            <NavLink className="authform__link" to="/signin">
              Войти
            </NavLink>
          </div>
        ) : (
          <div className="authform__link-container">
            <p className="authform__link-text">Ещё не зарегистрированы?</p>
            <NavLink className="authform__link" to="/signup">
              Регистрация
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
