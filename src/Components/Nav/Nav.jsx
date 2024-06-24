import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Nav.scss";

export default function Nav() {
  const auth = getAuth();
  const navigate = useNavigate();

  function exitUser() {
    signOut(auth).then(() => {
      navigate("/login");
    });
  }
  
  return (
    <div className="navigation">
      <div className="wrapper_logo">
        {" "}
        <img src={logo} alt="logo" />
      </div>
      <div className="links">
        <NavLink to="/films">Films</NavLink>
        <NavLink to="/home">Home</NavLink>
        <a href="#">Lorem</a>
        <a href="#">Lorem</a>
      </div>
      <div className="wrapper_user">
        <div className="user" onDoubleClick={exitUser}>
          <p>User</p>
        </div>
      </div>
    </div>
  );
}
