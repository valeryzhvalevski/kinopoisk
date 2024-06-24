import background from "../../assets/login-fon.png";
import "./Home.scss";
export default function Home({ posterObJ }) {
  const { poster } = posterObJ;

  return (
    <>
      <div className="wrapper-home">
        <img src={background} alt="background" />
      </div>
      <div className="wrapper_poster">
        <img src={poster} alt="poster" />
      </div>
    </>
  );
}
