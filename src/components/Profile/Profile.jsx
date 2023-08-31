import { useContext } from "react";
import { Link } from "react-router-dom";

import CurrentUserContext from "../../context/CurrentUserContext";
import Navigation from "../Navigation/Navigation";
import useInput from "../../hooks/useInput";

import "./Profile.css";

function Profile({ updateUser, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.data ? currentUser.data.name : "";
  const userEmail = currentUser.data ? currentUser.data.email : "";

  const nameValidation = useInput(userName, {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
  });

  const emailValidation = useInput(userEmail, { isEmpty: true, isEmail: true });

  const validMinName = () =>
    nameValidation.hasChanged && nameValidation.minLengthErr;

  const validMaxName = () =>
    nameValidation.hasChanged && nameValidation.maxLengthErr;

  const validEmail = () =>
    emailValidation.hasChanged && emailValidation.emailErr;

  const validEmpty = () => {
    return (
      (nameValidation.validEmpty && nameValidation.isEmpty) ||
      (emailValidation.hasChanged && emailValidation.isEmpty)
    );
  };

  const handleDisableButton = () =>
    (!nameValidation.inputValid || nameValidation.value === userName) &&
    (!emailValidation.inputValid || emailValidation.value === userEmail);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameValidation.value;
    const email = emailValidation.value;
    updateUser({ name, email });
  };

  return (
    <div className="profile">
      <Navigation logined />
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${userName}!`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="profile__info">
            <div className="profile__input-container">
              <span className="profile__span">Имя</span>
              <input
                className="profile__input"
                type="text"
                placeholder="Введите имя"
                name="name"
                onBlur={nameValidation.onBlur}
                onChange={nameValidation.onChange}
                value={nameValidation.value}
              />
            </div>
            <div className="profile__input-container">
              <span className="profile__span">E-mail</span>
              <input
                className="profile__input"
                type="email"
                placeholder="Введите почту"
                name="email"
                onBlur={emailValidation.onBlur}
                onChange={emailValidation.onChange}
                value={emailValidation.value}
              />
            </div>
            {validMinName() && (
              <span className="profile__error">
                Имя должно содержать не менее 2 символов
              </span>
            )}
            {validMaxName() && (
              <span className="profile__error">
                Имя должно содержать не более 30 символов
              </span>
            )}
            {validEmail() && (
              <span className="profile__error">Введен некорректный e-mail</span>
            )}
            {validEmpty() && (
              <span className="profile__error">
                Необходимо заполнить все поля
              </span>
            )}
          </div>
          <div className="profile__buttons-container">
            <button
              className="profile__button"
              disabled={handleDisableButton()}
              type="submit"
            >
              Редактировать
            </button>
            <Link
              className="profile__button"
              to="/"
              style={{ color: "#EE3465" }}
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
