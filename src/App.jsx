import "./style/App.scss";
import Nav from "./Components/Nav/Nav";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Films from "./Components/Films/Films";
import { getFilms } from "./Components/services/getFilms";
import { useEffect, useState } from "react";
import Login from "./Components/Login/Login";
import Registr from "./Components/Registr/Registr";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import getRandom from './Components/services/randomFunc'
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
const navigate = useNavigate()
const [films, setFilms]=useState(false)
const [poster, setPoster]= useState(null)
const posterObJ={poster, setPoster}
const auth = getAuth()

useEffect(()=>{
  onAuthStateChanged(auth, (user)=>{
    if(!user){
      navigate("/login")
    }
  })
},[])

useEffect(() => {
    getPrFilms();
  }, []);

async function getPrFilms(){
  const data = await getFilms()
  setFilms(data)
  setPoster(data.items[getRandom(0,20)].posterUrl)
}

  return (
    <div className="wrapper">
     <Nav />
      <Routes>
        <Route path="/" element={<Home posterObJ={posterObJ}/>} />
        <Route path="/films" element={<Films />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registr" element={<Registr />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
