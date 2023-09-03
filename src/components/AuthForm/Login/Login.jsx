import useInput from "../../../hooks/useInput";

import AuthForm from "../AuthForm";

function Login({ handleLogin, logError, serLogError }) {
  const passwordValidation = useInput("", { isEmpty: true });
  const emailValidation = useInput("", { isEmpty: true, isEmail: true });

  const validEmail = () =>
    emailValidation.hasChanged && emailValidation.emailErr;

  const validEmpty = () =>
    (emailValidation.hasChanged && emailValidation.isEmpty) ||
    (passwordValidation.hasChanged && passwordValidation.isEmpty);

  const handleDisableButton = () =>
    !emailValidation.inputValid || !passwordValidation.inputValid;

  const handleResetError = () => {
    serLogError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailValidation.value;
    const password = passwordValidation.value;
    handleLogin(email, password);
  };

  return (
    <AuthForm
      title={"Рады видеть!"}
      handleDisable={handleDisableButton}
      handleSubmit={handleSubmit}
    >
      <div className="authform__input-container">
        <span className="authform__span">E-mail</span>
        <input
          className="authform__input"
          type="email"
          placeholder="Введите почту"
          name="email"
          required
          onBlur={emailValidation.onBlur}
          onChange={emailValidation.onChange}
          onClick={handleResetError}
          value={emailValidation.value}
        />
      </div>
      <div className="authform__input-container">
        <span className="authform__span">Пароль</span>
        <input
          className="authform__input"
          type="password"
          placeholder="Введите пароль"
          required
          name="password"
          onBlur={passwordValidation.onBlur}
          onChange={passwordValidation.onChange}
          onClick={handleResetError}
          value={passwordValidation.value}
        />
      </div>
      {validEmail() && (
        <span className="authform__error">Введен некорректный e-mail</span>
      )}
      {validEmpty() && (
        <span className="authform__error">Необходимо заполнить все поля</span>
      )}
      {logError && (
        <span className="authform__error">
          Неправильно введены логин или пароль
        </span>
      )}
    </AuthForm>
  );
}

export default Login;
