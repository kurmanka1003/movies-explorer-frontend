import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <Navigation logined />
      <div className="profile__container">
        <h2 className="profile__title">Привет, пользователь!</h2>
        <div className="profile__info">
          <div className="profile__input-container">
            <span className="profile__span">Имя</span>
            <input
              className="profile__input"
              type="text"
              placeholder="Румия"
              name="name"
            />
          </div>
          <div className="profile__input-container">
            <span className="profile__span">E-mail</span>
            <input
              className="profile__input"
              type="email"
              placeholder="pochta@yandex.ru"
              name="email"
            />
          </div>
        </div>
        <div className="profile__buttons-container">
          <Link className="profile__button">Редактировать</Link>
          <Link className="profile__button" to="/" style={{ color: "#EE3465" }}>
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
