import React , { useEffect, useState} from "react";
import axios from "axios";
import Note from "./Note";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';



  // localStorage.setItem('itemName', value)
  // localStorage.getItem('itemName')

let url = "https://inotebook123.herokuapp.com/get-notes/";

function Notes(props) {
  const token = localStorage.getItem('token')
  console.log(token);
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
  },[]);

  return (
    <div>
      {/* <br></br>Data :<br></br>{data.first_name}<br></br> {data.last_name} <br></br>{data.username} <br></br>{data.id} */}
      Notes
      {/* <div className="row flex" style={{justifycontent: "center"}}> */}
      <ul className="list-group list-group-horizontal" style={{justifycontent: "center" , margin: "2px"}}>
                        {data && data.map((element) => {
                            if(!data) return null;
                            else{
                            return <div className="col-md-3" key={element.id}>
                              <li className="list-group-item">
                                <Note data = {element} getdata={getData} token ={props.token}/>
                                </li>
                            </div>}
                        })}
      </ul>
      {/* </div> */}
      <Link to="/createnote">
      `       <Button variant="contained">Make a note</Button>
              {/* <button></button> */}
            </Link>
    </div>
  );
}

export default Notes;
