import "./App.css";
import Apistest from "./components/Apistest";
import Login from "./components/Login";
import Notes from "./components/Notes";
import Register from "./components/Register";
import CreateNote from "./components/CreateNote";
import { useState } from "react";
import { BrowserRouter as Router,  Routes, Route} from "react-router-dom";

function App() {
  const [token, setData] = useState("");

  const childToParent = async (childdata) => {
    setData(childdata);
    console.log(token);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element = { <Login childToParent={childToParent} />}>
          </Route>
          <Route exact path="/register" element = { <Register childToParent={childToParent}/>}>
          </Route>
          <Route path="/apistest" element = {<Apistest token={token} />}>   
          </Route>
          <Route exact path="/notes" element = { <Notes token={token}/>}>
          </Route>
          <Route exact path="/createnote" element = { <CreateNote token={token}/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
