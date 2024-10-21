import { Outlet } from "react-router-dom";
import BgImage from "../assets/BgImage.png";
import NavBar from "../components/NavBar/NavBar";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Home = () => {
  return (
    <>
      <div style={bgStyle} className="overflow-x-hidden">
        <div className="min-h-screen bg-white/50 backdrop-blur-3xl">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
