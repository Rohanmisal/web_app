import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const auth = getAuth();
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">WebApp</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <li>
            <div
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                  })
                  .catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
              }}
            >
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
