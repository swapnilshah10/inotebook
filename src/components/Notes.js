import React from "react";
import axios from "axios";
import { useState } from "react";
import Note from "./Note";

let url = "https://inotebook123.herokuapp.com/get-notes/";
let token = "efc434f15a4e968fbf5aee9abbcfd27c8c93eac8";

function Notes(props) {
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
      <br></br><button onClick = {getData}>Get Notes</button>
      <br></br>Data :<br></br>{data.first_name}<br></br> {data.last_name} <br></br>{data.username} <br></br>{data.id}
      <div className="row">
                        {data && data.map((element) => {
                            if(!data) return null;
                            else{
                            return <div className="col-md-3" key={element.id}>
                                <Note data = {element}/>
                            </div>}
                        })}
      </div>
    </div>
  );
}

export default Notes;
