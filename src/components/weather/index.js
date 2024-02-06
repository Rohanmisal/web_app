import React from "react";
import CurrentLocation from "./CurrLoc";
//import Weather from "./CurrLoc";
//import Forcast from "./Forca";
import "./app.css";

function App() {
  return (
    <React.Fragment>
      
      <div className="container">
        <CurrentLocation />
        {/* <Forcast/> */}
      </div>
     
    </React.Fragment>
  );
}

export default App;