import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function UpdateNote() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [iscreated, setCreate] = useState(false);
  const { id } = useParams();
  let token = localStorage.getItem("token");
  // const history = useHistory();

  let yourConfig = {
    headers: {
      Authorization: "Token " + token,
    },
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/get-note/${id}/`, yourConfig)
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setTags(res.data.tags);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedNote = {
      name: name,
      description: description,
      tags: tags,
    };
    await axios.put(
      `http://127.0.0.1:8000/update-notes/${id}/`,
      updatedNote,
      yourConfig
    );
    setCreate(true);
    // history.push("/notes
  };

  if (isLoading) {
    return (
      <div
        sx={{
          backgroundImage: "url(./updatee.jpg)",
        }}
      >
        Loading...
      </div>
    );
  }
  if (iscreated) {
    return <Navigate to="/notes" />;
  }

  return (
    <div>
      <Box
        sx={{
          backgroundImage: "url(/updatee.jpg)",
          backgroundSize: "cover",
          opacity: "0.9",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 5,
            minWidth: 300,
            maxWidth: 500,
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            background: "white",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Update Note
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "20px" }}>
                <TextField
                  id="name"
                  label="Enter name of note"
                  variant="standard"
                  onChange={handleNameChange}
                  value={name}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <TextField
                  id="description"
                  label="Enter description"
                  onChange={handleDescriptionChange}
                  variant="standard"
                  value={description}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <TextField
                  id="tags"
                  label="Enter tag"
                  variant="standard"
                  onChange={handleTagsChange}
                  value={tags}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button variant="contained" type="submit">
                Update Note
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default UpdateNote;
