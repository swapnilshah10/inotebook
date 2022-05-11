import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

let token = "efc434f15a4e968fbf5aee9abbcfd27c8c93eac8";

function Updatenote() {
  const params = useParams();
  let url1 = `https://inotebook123.herokuapp.com/get-note/${params.id}/`;
 
  let getData = async () => {
    await axios
      .get(url1, yourConfig)
      .then((res) => {
        setvalue(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
     getData();
  }, []);

 

  let url = `https://inotebook123.herokuapp.com/update-notes/${params.id}/`;
  const [name, setname] = useState("data.name");
  const [description, setdesc] = useState("data.description");
  const [tags, settag] = useState("data.tags");
  
  let setvalue = (data) => (
    setname(data.name),
    setdesc(data.description),
    settag(data.tags)
  )

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
  const [isupdated, setUpdate] = useState(false);

  if (isupdated) {
    return <Navigate to="/notes" />;
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      tags: tags,
    };
    console.log(data);
    postData(data);
    setUpdate(true);
  };

  let postData = async (data) => {
    await axios
      .put(url, data, yourConfig)
      .then((res) => {<Navigate to="/notes"/>})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <br></br>

      <div>
        <div className="login-form">
          <form>
            <h1>Update Note</h1>
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

export default Updatenote;
