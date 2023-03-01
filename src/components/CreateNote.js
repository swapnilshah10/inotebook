import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

let url = "https://inotebook123.herokuapp.com/post-notes/";
url = "http://127.0.0.1:8000/post-notes/";

function CreateNote(props) {
  let token = localStorage.getItem("token");
  const [name, setname] = useState("");
  const [description, setdesc] = useState("");
  const [tags, settag] = useState("");
  const [iscreated, setCreate] = useState(false);

  let ondescChange = (e) => {
    setdesc(e.target.value);
  };

  let onnameChange = (e) => {
    setname(e.target.value);
  };

  let ontagChange = (e) => {
    settag(e.target.value);
  };

  let yourConfig = {
    headers: {
      Authorization: "Token " + token,
    },
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      tags: tags,
    };
    await postData(data);
    setCreate(true);
  };

  let postData = async (data) => {
    await axios
      .post(url, data, yourConfig)
      .then((res) => {
        // setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  if (iscreated) {
    return <Navigate to="/notes" />;
  }

  return (
    <div>
      <Box
        sx={{
          backgroundImage: "url(./backgroundd.jpg)",
          backgroundSize: "cover",
          opacity: "0.9",   
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          to="/notes"
          style={{
            textDecoration: "none",
            color: "white",
            position: "fixed",
            top: "5%",
            left: "5%",
          }}
        >
          <Button variant="contained" color="primary">
            Back
          </Button>
        </Link>
        <Box
          sx={{
            p: 5,
            minWidth: 300,
            maxWidth: 500,
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            background: "white",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Create Note
          </Typography>
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <TextField
                id="username"
                label="Enter name of note"
                variant="standard"
                onChange={onnameChange}
              />
              <TextField
                id="description"
                label="Enter description"
                onChange={ondescChange}
                variant="standard"
              />
              <TextField
                id="tags"
                label="Enter tag"
                variant="standard"
                onChange={ontagChange}
              />
              <Button variant="contained" type="submit" color="primary">
                Post Note
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default CreateNote;
