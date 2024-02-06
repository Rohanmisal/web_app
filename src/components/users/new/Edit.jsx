import "./new.css";  // Import your CSS file for styling
import Sidebar from "../../sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import {  db } from "../../../utils/firebase";
import {
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
// import { getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

const Edit = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
 
 const navigate = useNavigate();
  const { userId } = useParams();  // Get the user ID from the route parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setData(userDoc.data());
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", userId), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                data.img
                  ? data.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleEdit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === 'date' ? (
                    <input
                      id={input.id}
                      type="date"
                      value={data[input.id] || ''}
                      onChange={handleInput}
                    />
                  ) : input.type === 'select' ? (
                    <select
                      id={input.id}
                      value={data[input.id] || ''}
                      onChange={handleInput}
                    >
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={data[input.id] || ''}
                      onChange={handleInput}
                    />
                  )}
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
