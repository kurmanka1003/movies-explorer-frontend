import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import CurrentUserContext from "../../context/CurrentUserContext";
import Navigation from "../Navigation/Navigation";

import "./Profile.css";

function Profile({ updateUser, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userEmail = currentUser.email;

  const [formValue, setFormValue] = useState({
    email: userEmail,
    name: userName,
  });

  const [accessEdit, setAccessEdit] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(formValue);
    toggleAccessEdit();
  };

  const toggleAccessEdit = () => {
    setAccessEdit(!accessEdit);
  };

  useEffect(() => {
    if (formValue.email === userEmail && formValue.name === userName) {
      return setButtonDisable(true);
    } else {
      return setButtonDisable(false);
    }
  }, [formValue.email, formValue.name, userEmail, userName]);

  return (
    <div className="profile">
      <Navigation logined />
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${userName}!`}</h2>
        <div className="profile__info">
          <div className="profile__input-container">
            <span className="profile__span">Имя</span>
            <input
              className="profile__input"
              type="text"
              placeholder="Введите имя"
              name="name"
              value={formValue.name}
              disabled={accessEdit}
              onChange={handleChange}
            />
          </div>
          <div className="profile__input-container">
            <span className="profile__span">E-mail</span>
            <input
              className="profile__input"
              type="email"
              placeholder="Введите почту"
              name="email"
              value={formValue.email}
              disabled={accessEdit}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="profile__buttons-container">
          <Link
            className={`profile__button ${
              !accessEdit && buttonDisable ? "profile__button_disabled" : ""
            }`}
            onClick={accessEdit ? toggleAccessEdit : handleSubmit}
          >
            {accessEdit ? "Редактировать" : "Изменить"}
          </Link>
          <Link
            className="profile__button"
            to="/"
            style={{ color: "#EE3465" }}
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
