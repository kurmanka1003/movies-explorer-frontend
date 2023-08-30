import AuthForm from "../AuthForm";
import useInput from "../../../hooks/useInput";

function Register({ regError, setRegError, handleRegister }) {
  const nameValidation = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
  });
  
  const emailValidation = useInput("", { isEmpty: true, isEmail: true });

  const passwordValidation = useInput("", { isEmpty: true });

  const validMinName = () =>
    nameValidation.hasChanged && nameValidation.minLengthErr;

  const validMaxName = () =>
    nameValidation.hasChanged && nameValidation.maxLengthErr;

  const validEmail = () =>
    emailValidation.hasChanged && emailValidation.emailErr;

  const validEmpty = () => {
    return (
      (nameValidation.validEmpty && nameValidation.isEmpty) ||
      (emailValidation.hasChanged && emailValidation.isEmpty) ||
      (passwordValidation.hasChanged && passwordValidation.isEmpty)
    );
  };

  const handleDisableButton = () =>
    !nameValidation.inputValid ||
    !emailValidation.inputValid ||
    !passwordValidation.inputValid;

  const handleResetError = () => {
    setRegError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameValidation.value;
    const email = emailValidation.value;
    const password = passwordValidation.value;
    handleRegister(name, email, password);
  };

  return (
    <AuthForm
      title={"Добро пожаловать!"}
      handleDisable={handleDisableButton}
      handleSubmit={handleSubmit}
    >
      <div className="authform__input-container">
        <span className="authform__span">Имя</span>
        <input
          className="authform__input"
          type="text"
          placeholder="Введите имя"
          name="name"
          required
          onChange={nameValidation.onChange}
          onBlur={nameValidation.onBlur}
          onClick={handleResetError}
          value={nameValidation.value}
        />
      </div>
      <div className="authform__input-container">
        <span className="authform__span">E-mail</span>
        <input
          className="authform__input"
          type="email"
          placeholder="Введите почту"
          name="email"
          required
          onChange={emailValidation.onChange}
          onBlur={emailValidation.onBlur}
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
          onChange={passwordValidation.onChange}
          onBlur={passwordValidation.onBlur}
          onClick={handleResetError}
          value={passwordValidation.value}
        />
      </div>
      {validMinName() && (
        <span className="authform__error">
          Имя должно содержать не менее 2 символов
        </span>
      )}
      {validMaxName() && (
        <span className="authform__error">
          Имя должно содержать не более 30 символов
        </span>
      )}
      {validEmail() && (
        <span className="authform__error">Введен некорректный e-mail</span>
      )}
      {validEmpty() && (
        <span className="authform__error">Необходимо заполнить все поля</span>
      )}
      {regError && (
        <span className="authform__error">
          Произошла ошибка, попробуйте повторить попытку
        </span>
      )}
    </AuthForm>
  );
}

export default Register;
