import * as React from "react";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';


export default function BasicCard(props) {
  let url = `https://inotebook123.herokuapp.com/delete-notes/${props.data.id}/`;
  url = `http://127.0.0.1:8000//delete-notes/${props.data.id}/`;

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
    <>
    <Card sx={{   backgroundColor:"#00FA9A" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.data.name}
        </Typography>
        <Typography variant="h5" component="div">
          {props.data.description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.data.tags}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/updatenote/${props.data.id}/`}>
          <Button variant="contained" size="small">Update</Button>
        </Link>
        <Button  sx={{ mb: 0.5  , color : "grey"}} onClick={delData} size="small"><DeleteIcon /></Button>
      </CardActions>
    </Card>
    </>
  );
}
