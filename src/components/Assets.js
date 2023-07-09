import { useState } from "react";
import axios from "axios";

const Assets = ({ onSelectAsset }) => {
  const [formData, setFormData] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };

  const username = getQueryParam("username");

  const handleChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.token && formData.quantity) {
      try {
        const response = await axios.post("http://localhost:5000/users/assets", {
          username: username,
          token: formData.token,
          quantity: formData.quantity,
        });
        setResponseMessage(response.data);
        window.location.reload();
        // Call the parent component's callback function
        onSelectAsset(response.data);
        setFormData({});
      } catch (error) {
        console.error(error);
        setResponseMessage("Error occurred");
      }
    }
  };

  return (
    <div className="col-lg-12" style={{ marginRight: "2rem" }}>
      <h3 className="text-body-secondary mb-4 text-center">Add an Asset</h3>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              id="token"
              className="form-control"
              value={formData.token || ""}
              onChange={handleChange}
              placeholder="Enter Token"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              id="quantity"
              className="form-control"
              value={formData.quantity || ""}
              onChange={handleChange}
              placeholder="Enter Quantity"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          {responseMessage && (
            <p style={{ marginLeft: "1rem", color: "red" }}>{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Assets;
