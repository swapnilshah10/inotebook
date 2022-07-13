import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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

  return (
    <div>
      Notes
      <Box sx={{ "& button": { m: 1 } }}>
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
                    <li className="list-group-item">
                      <Note
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
