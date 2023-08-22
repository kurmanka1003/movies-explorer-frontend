import AuthForm from "../AuthForm";

function Login() {
  return (
    <AuthForm title={"Рады видеть!"}>
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

export default Login;
