import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import background from "../../assets/login-fon.png";
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [emptyField, setEmptyfield] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  function entryUser() {
    if (email === "" || password === "") {
      setEmptyfield(true);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigate("/");
      })
      .catch((err) => {
        setValidUser(true);
        return;
      });
  }

  useEffect(() => {
    setValidUser(false);
  }, [email, password]);

  useEffect(() => {
    setEmptyfield(false);
  }, [password, email]);

  return (
    <div className="login">
      <div className="background-login">
        <img src={background} alt="logo" />
        <form className="form">
          <h2>Войдите или зарегистрируйтесь</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={entryUser}>
            Войти
          </button>
          <Link to="/registr" style={{textDecoration:"underline"}}>Зарегистрироваться</Link>
          <Link to="/reset">Забыли пароль?</Link>
          {emptyField && (
            <p className="valid-pass">Все поля должны быть заполнены!</p>
          )}
          {validUser && (
            <p className="valid-pass">Неверное имя пользователя или пароль!</p>
          )}
        </form>
      </div>
    </div>
  );
}
