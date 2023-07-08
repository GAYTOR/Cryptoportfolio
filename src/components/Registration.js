import { useState } from "react";
import axios from "axios";

const Forum = () => {
  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.username) {
      try {
        const response = await axios.post("http://localhost:5000/users/add", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        setSuccess(true);
        setErrMsg(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setErrMsg(true);
        setSuccess(false);
      }
    }
    setFormData({});
  };

  return (
    <div className="col-lg-12" style={{ marginLeft: "2rem" }}>
      <h3 className="text-body-secondary mb-4">REGISTRATION</h3>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              id="username"
              className="form-control"
              value={formData.username || ""}
              onChange={handleChange}
              placeholder="Enter Username"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
          {errMsg && <p style={{ color: "red", marginLeft: "1rem" }}>ERROR </p>}
          {success && (
            <p style={{ color: "green", marginLeft: "1rem" }}>SUCCESS</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Forum;
