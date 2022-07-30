import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'; 


function Updatenote() {
  const params = useParams();
  let token =  localStorage.getItem('token');
  let url1 = `https://inotebook123.herokuapp.com/get-note/${params.id}/`;
 
  let getData = async () => {
    await axios
      .get(url1, yourConfig)
      .then((res) => {
        setvalue(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
     getData();
  }, []);

 

  let url = `https://inotebook123.herokuapp.com/update-notes/${params.id}/`;
  const [name, setname] = useState("loading name");
  const [description, setdesc] = useState("loading description");
  const [tags, settag] = useState("loading tags");
  
  let setvalue = (data) => (
    setname(data.name),
    setdesc(data.description),
    settag(data.tags)
  )

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
  const [isupdated, setUpdate] = useState(false);
  if (isupdated) {
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
    setUpdate(true);
  };

  let postData = async (data) => {
    await axios
      .put(url, data, yourConfig)
      // .then(() => {<Navigate to="/notes"/>})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box sx={{ '& button': { m: 1 } , background:"#3CB371" ,height: '100vh' ,display: " flex" , justifyContent: 'center' , alignItems: 'up'}}>
      <div>
        <div className="login-form">
          <form>
            <h1>Update Note</h1>
            <div className="content">
              <div className="input-field">
              <TextField id="username" label="Enter name of note" variant="standard" onChange={onnameChange} value={name} />
              </div>
              <div className="input-field">
              <TextField id="description" label="Enter description" onChange={ondescChange} variant="standard" value={description} />
              </div>
              <div className="input-field">
              <TextField id="tags" label="Enter tag" variant="standard" onChange={ontagChange} value={tags}/>
              </div>
            </div>
            <div className="action">
              <Button variant="contained" onClick={handleSubmit}>Update Note</Button>
            </div>
          </form>
        </div>
      </div>
      </Box>
    </div>
  );
}

export default Updatenote;
