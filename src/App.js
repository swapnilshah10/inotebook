import "./App.css";
import Apistest from "./components/Apistest";
import Login from "./components/Login";
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
          <Route path="/" element = { <Login childToParent={childToParent} />}>
          </Route>
          <Route path="/apistest" element = {<Apistest token={token} />}>   
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
