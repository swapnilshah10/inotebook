import "./App.css";
// import Apistest from "./components/Apistest";
import React  from 'react';
// import Login from "./components/Login";
// import Notes2 from "./components/Notes2";
import Notes from "./components/Notes";
import Login2 from "./components/Login2";
// import Register from "./components/Register";
import Register2 from "./components/Register2";
import CreateNote from "./components/CreateNote";
import Updatenote from "./components/Updatenote";
import { useState } from "react";
import { BrowserRouter as Router,  Routes, Route} from "react-router-dom";

function App() {
  const [token, setData] = useState("");

  const childToParent = async (childdata) => {
    setData(childdata);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
         
          <Route exact path="/" element = { <Login2/>}>
          </Route>
         
          <Route exact path="/register2" element = { <Register2 childToParent={childToParent}/>}>
          </Route>
          
          <Route exact path="/notes" element = { <Notes token={token}/>}>
          </Route>
          {/* <Route exact path="/notes2" element = { <Notes2 token={token}/>}>
          </Route> */}
          
          <Route exact path="/createnote" element = { <CreateNote token={token}/>}>
          </Route>
          <Route  path="/updatenote/:id/" element = { <Updatenote token={token}/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
