import React, { useEffect, useState } from "react";
import axios from "axios";

import Note2 from "./Note2";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

// let url = "https://inotebook123.herokuapp.com/get-notes/";
let url = "http://127.0.0.1:8000/get-notes/";


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
    localStorage.removeItem("token");
    setLogout(true);
  };
  const [isLoggedout, setLogout] = useState(false);

  if (isLoggedout) {
    return <Navigate to="/" />;
  }
 
  var style={backgroundImage: "url(/background.jpg)",
  backgroundSize: "cover",
  backgroundRepeat: "repeat-y"}

  if(data.length < 9 && window.innerWidth > 900){
    style = {backgroundImage: "url(/background.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "repeat-y",height: '100vh'}
  }

  return (
    <div style={style}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          "& button": { m: 1 },
          alignitem: "center",  
          justifycontent: "center",
        }}
      >

        <br></br>
        <Button variant="text" onClick={logout} style={{ float: "right" , height: "10px" }}>
          Logout
        </Button>
        <br></br>
       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       
          {data &&
            data.map((element) => {
              if (!data) return null;
              else {
                return (
                  <Grid item xs sm={4} md={3} key={element.id}>
                    <li
                      className="list-group-item"
                      style={{
                        justifycontent: "center",
                        margin: "10px",
                        padding: "0px",
                      }}
                    >
                      <Note2
                        data={element}
                        getdata={getData}
                        token={props.token}
                      />
                    </li>
                  </Grid>
                );
              }
            })}
      </Grid>
        <Link to="/createnote">
          <Button variant="contained" sx={{ position: 'fixed', bottom: 0, right: "0%" ,alignItems : "center"}} >Make a note</Button>
        </Link>
      </Box>
      </Box>
    </div>
  );
}

export default Notes;
