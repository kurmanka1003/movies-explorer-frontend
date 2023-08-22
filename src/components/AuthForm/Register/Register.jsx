import AuthForm from "../AuthForm";

function Register() {
  return (
    <AuthForm title={"Добро пожаловать!"}>
      <div className="authform__input-container">
        <span className="authform__span">Имя</span>
        <input
          className="authform__input"
          type="text"
          placeholder="Введите имя"
          name="name"
          required
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
        />
      </div>
    </AuthForm>
  );
}

export default Register;
