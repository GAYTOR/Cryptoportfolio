import { useState } from "react";
import "./main.css";

const Home = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({});
    console.log(formData);
  };
  

  return (
    <div
      style={{ backgroundSize: "100%", height: "100vh" }}
      className="bg-gradient bg-secondary bg-opacity-75"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          id="username"
          value={formData.username || ""}
          onChange={handleChange}
          placeholder="Enter Username"
        />
        <br></br>
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          id="password"
          value={formData.password || ""}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <button
          type="submit"
          className="btn btn-outline-dark"
          style={{ marginLeft: "1rem" }}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Home;
