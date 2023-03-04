import * as React from "react";
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
    <Card sx={{ 
        width: 350, 
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#E0FFFF",
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "15px",
        overflow: "hidden",
        position: "relative"
      }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold", color: "#004D40" }}>
          {props.data.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1.5, color: "#004D40" }}>
          {props.data.description}
        </Typography>
        <Typography variant="body2" sx={{ color: "#004D40" }}>
          {props.data.tags}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
        <Link to={`/updatenote/${props.data.id}/`}>
          <Button variant="contained" size="small" sx={{ borderRadius: "0 0 0 15px", backgroundColor: "#8BC34A", color: "white", textDecoration :false ,"&:hover": { backgroundColor: "#7CB342" , textDecoration :"none" } }}>Update</Button>
        </Link>
        <Button onClick={delData} size="small" sx={{ borderRadius: "0 0 15px 0", color: "#BDBDBD", "&:hover": { color: "#616161" } }}><DeleteIcon /></Button>
      </CardActions>
    </Card>
  );
}
