import Sidebar from "../components/sidebar/Sidebar";
import "./home.css";
import App from "./weather";
const Home = () => {
  return (
    <>
      <div className="home">
        <Sidebar />

        <div className="homeContainer">
          <App />
        </div>
      </div>
    </>
  );
};

export default Home;
