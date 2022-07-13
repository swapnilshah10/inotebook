import React from 'react';
import axios from "axios";
// import Updatenote from './Updatenote';
import { Link } from "react-router-dom";

function Note(props) {
  
  // let token = "efc434f15a4e968fbf5aee9abbcfd27c8c93eac8"; 
  let url = `https://inotebook123.herokuapp.com/delete-notes/${props.data.id}/`;
  const token = localStorage.getItem('token')
  let yourConfig = {
    headers: {
      Authorization: "Token " + token,
    },
  };
  let data = {}
  let delData = async () => {
    await axios
      .post(url, data , yourConfig)
      .then(() => {
         props.getdata();
      })
      .catch((err) => console.log(err.response.data.detail));  
  };


  return (
    <div>
        {props.data.name}
        <div>{props.data.description}</div>
        <div>{props.data.tags}</div>
        <button onClick = {delData}>Delete Note</button>
        <Link to= {`/updatenote/${props.data.id}/`}>
              <button>Update note</button>
            </Link>
        <br></br>
    </div>
  )
}

export default Note