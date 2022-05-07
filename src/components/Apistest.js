import React from "react";
import axios from "axios";
import { useState } from "react";
import Notes from "./Notes";

let url = "https://inotebook123.herokuapp.com/login/get-details/";
// let url = "http://127.0.0.1:8000/get-notes/";
let token = "efc434f15a4e968fbf5aee9abbcfd27c8c93eac8";

function Apistest(props) {
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
        console.log(res.data);      
      })
      .catch((err) => console.log(err));  
  };
  return (
    <div>
      Token received in another component: {props.token}
      <br></br><button onClick = {getData}>Get data</button>
      <br></br>Data :<br></br>{data.first_name}<br></br> {data.last_name} <br></br>{data.username} <br></br>{data.id}
      <Notes token={props.token}/>
    </div>
  );
}

export default Apistest;
