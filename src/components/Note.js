import React from "react";
import axios from "axios";
// import Updatenote from './Updatenote';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

const colors =  indigo[400];

function Note(props) {
  let url = `https://inotebook123.herokuapp.com/delete-notes/${props.data.id}/`;
  const token = localStorage.getItem("token");
  let yourConfig = {
    headers: {
      Authorization: "Token " + token,
    },
  };
  let data = {};
  let delData = async () => {
    await axios
      .post(url, data, yourConfig)
      .then(() => {
        props.getdata();
      })
      .catch((err) => console.log(err.response.data.detail));
  };

  return (
    <div  sx={{  backgroundColor: "blue", color :colors}}>
      {props.data.name}
      <div>{props.data.description}</div>
      <div>{props.data.tags}</div>
      <Box sx={{ '& button': { m: 1 } }}>
      <Button variant="contained" size="small" onClick={delData} startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Link to={`/updatenote/${props.data.id}/`}>
      <Button variant="contained" size="small">Update note</Button>  
      </Link>
      </Box>
      <br></br>
    </div>
  );
}

export default Note;
