import React, { useState } from "react";
import axios from "axios";

// http://127.0.0.1:8000/post-notes/
let url = "https://inotebook123.herokuapp.com/post-notes/";
let token = "efc434f15a4e968fbf5aee9abbcfd27c8c93eac8";

function CreateNote(props) {
  const [name, setname] = useState("");
  const [description, setdesc] = useState("");
  const [tags, settag] = useState("");
  const [da, setData] = useState("");

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

  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      tags: tags,
    };
    postData(data);
};
    
    let postData = async (data) => {
      await axios
        .post(url, data, yourConfig)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };

    return (
      <div>
        <br></br>
       
        <div>
          <div className="login-form">
            <form>
              <h1>Create Note   </h1>
              <div className="content">
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter name of note"
                    value={name}
                    onChange={onnameChange}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={ondescChange}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter tag"
                    value={tags}
                    onChange={ontagChange}
                  />
                </div>
              </div>
              <div className="action">
              <button onClick={handleSubmit}>Post Note</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
}

export default CreateNote;
