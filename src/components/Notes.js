import React, { useEffect, useState } from "react";
import axios from "axios";
// import Note from "./Note";
import Note2 from "./Note2";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";

let url = "https://inotebook123.herokuapp.com/get-notes/";

function Notes(props) {
  const token = localStorage.getItem("token");
  const [data, setDats] = useState("");
  let yourConfig = {
    headers: {
      Authorization: "Token " + token,
    },
  };
  let getData = async () => {
    await axios
      .get(url, yourConfig)
      .then((res) => {
        setDats(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);
  
  let logout = async (e) => {
    localStorage.removeItem('token');
    setLogout(true);
  }
  const [isLoggedout, setLogout] = useState(false);

  if (isLoggedout) {
    return <Navigate to="/" />;
  }


  return (
    <div>
      <Box sx={{  backgroundImage: 'url(/background.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
            backgroundPosition: 'center',height: '100vh', "& button": { m: 1 } }}>
              <Button variant="text" onClick={logout} style ={{float  : 'right'}}>Logout</Button>
              <br></br>
        <ul
          className="list-group list-group-horizontal"
          style={{ justifycontent: "center", margin: "2px" }}
        >
          {data &&
            data.map((element) => {
              if (!data) return null;
              else {
                return (
                  <div className="col-md-3" key={element.id}>
                      <li className="list-group-item" style={{ justifycontent: "center", margin: "2px",backgroundImage: 'url(/blue.jpg)',
                      backgroundRepeat: 'no-repeat', }}>
                      <Note2
                        data={element}
                        getdata={getData}
                        token={props.token}
                      />
                    </li>
                  </div>
                );
              }
            })}
        </ul>

        <Link to="/createnote">
          <Button variant="contained">Make a note</Button>
        </Link>
      </Box>
    </div>
  );
}

export default Notes;
