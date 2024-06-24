import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import background from "../../assets/login-fon.png";
import "./ResetPassword.scss";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [modalResetPass, setModalResetPass] = useState(true);
  const [resetErr, setResetErr] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  function resetPass() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setModalResetPass(false);
      })
      .catch((e) => {
        console.log(e);
        setResetErr(true);
      });
  }
  useEffect(() => {
    setResetErr(false);
  }, [email]);

  return (
    <div>
      <div className="reset">
        <div className="background-reset">
          <img src={background} alt="background" />
          {modalResetPass ? (
            <form className="form">
              <h2>Забыли пароль?</h2>
              <p>
                Ссылка для сброса пароля придет на указанный электронный адрес
              </p>
              <input
                type="email"
                placeholder="Введите Ваш e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {resetErr && (
                <p className="reset-err">Проверьте введенные данные!</p>
              )}

              <button type="button" onClick={resetPass}>
                Отправить
              </button>
            </form>
          ) : (
            <form className="formReset">
              <h3>Письмо отправлено на электронную почту</h3>
              <button
                type="button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                OK
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
