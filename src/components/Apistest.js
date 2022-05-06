import React from "react";
import axios from "axios";
import { useState } from "react";

let url = "http://127.0.0.1:8000/login/get-details/";

function Apistest(props) {
  const [data, setDats] = useState("");
  let yourConfig = {
    headers: {
      Authorization: "Token " + props.token,
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
    </div>
  );
}

export default Apistest;
