import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

let url = "https://inotebook123.herokuapp.com/post-notes/";


function CreateNote(props) {
  let token =  localStorage.getItem('token')
  const [name, setname] = useState("");
  const [description, setdesc] = useState("");
  const [tags, settag] = useState("");
  // const [da, setData] = useState("");

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
const [iscreated, setCreate] = useState(false);

if (iscreated) {
  return <Navigate to="/notes" />;
}

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

    return (
      <div>
        <br></br>
        <Box sx={{ '& button': { m: 1 } }}>
        <div>
          <div className="login-form">
            <form>
              <h1>Create Note   </h1>
              <div className="content">
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter name of note"
                    value={name}
                    onChange={onnameChange}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={ondescChange}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter tag"
                    value={tags}
                    onChange={ontagChange}
                  />
                </div>
              </div>
              <div className="action">
              <Button variant="contained" onClick={handleSubmit}>Post Note</Button>
              </div>
            </form>
          </div>
        </div>
        </Box>
      </div>
    );
  
}

export default CreateNote;
