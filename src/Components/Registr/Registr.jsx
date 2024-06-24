import { useEffect, useState } from "react";
import registrUser from "./registrUser";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/database";
import background from "../../assets/login-fon.png";
import "./Registr.scss";

export default function Registr() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondpassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [emptyField, setEmptyfield] = useState(false);
  const [validUser, setValidUser] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setValidPass(false);
  }, [password, secondpassword]);

  useEffect(() => {
    setPassLength(false);
  }, [password, secondpassword]);

  useEffect(() => {
    setEmptyfield(false);
  }, [password, secondpassword, name, surname, email]);

  useEffect(() => {
    setValidUser(false);
  }, [password, secondpassword, name, surname, email]);

  return (
    <div className="registr-wrapper">
      <div className="background-registr">
        <img src={background} alt="logo" />
        <form className="form">
          <h2>Регистрация</h2>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Повторите пароль"
            value={secondpassword}
            onChange={(e) => setSecondpassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => {
              registrUser(
                {
                  email: email,
                  password: password,
                  secondpassword: secondpassword,
                  name: name,
                  surname: surname,
                },
                auth,
                createUserWithEmailAndPassword,
                setValidPass,
                setPassLength,
                setEmptyfield,
                setValidUser,
                navigate,
                addUser
              );
            }}
          >
            Зарегистрироваться
          </button>
          {validPass && <p className="valid-pass">Пароли не совпадают!</p>}
          {passLength && (
            <p className="valid-pass">
              Пароль должен содержать минимум 6 символов!
            </p>
          )}
          {emptyField && (
            <p className="valid-pass">Все поля должны быть заполнены!</p>
          )}
          {validUser && (
            <p className="valid-pass">
              Такой пользователь уже существует или введен неправильный e-mail!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
