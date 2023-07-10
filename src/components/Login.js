import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.username) {
      try {
        const response = await axios.post("http://localhost:5000/users/check", {
          username: formData.username,
          password: formData.password,
        });
        setResponseMessage(response.data);
        window.location.href = `#/Dashboard?username=${formData.username}`;
      } catch (error) {
        console.error(error);
        setResponseMessage("Error occurred");
      }
    }
    setFormData({});
  };

  return (
    <div className="col-lg-12" style={{ marginRight: "2rem" }}>
      <h3 className="text-body-secondary mb-4">LOGIN</h3>
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
              type="password"
              id="password"
              className="form-control"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {responseMessage && (
            <p style={{ marginLeft: "1rem", color: "red" }}>{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
