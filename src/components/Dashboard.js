import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Assets from "./Assets";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    const beforeMountFunction = async () => {
      const queryParams = new URLSearchParams(location.search);
      const username = queryParams.get("username");
      if (!username) {
        window.location.href = "/";
      } else {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/?username=${username}`
          );
          setAssets(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    beforeMountFunction();
  }, [location.search]);

  // Callback function to handle asset selection
  const handleAssetSelection = (asset) => {
    setSelectedAsset(asset);
  };

  const handleDelete = async (username, token) => {
    try {
      await axios.post(
        "http://localhost:5000/users/delete",
        {
          username: username,
          token: token,
        },
        window.location.reload()
      );

      // Refresh the asset list
      const response = await axios.get(
        `http://localhost:5000/users/?username=${username}`
      );
      setAssets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Extract the username from the URL parameters
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const handleLogout =()=>{
    window.location.href = "/";

  }
  return (
    <div>
      <h3 className="text-body-secondary mb-4 text-center">DASHBOARD</h3>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Qty. Owned</th>
            <th scope="col">Price</th>
            <th scope="col">Total Value</th>
            <th scope="col">Allocation</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((item, index) => (
            <tr key={index}>
              <td className="table-primary">{item.token}</td>
              <td className="table-primary">{item.quantity}</td>
              <td className="table-primary">{item.price}</td>
              <td className="table-primary">{item.total_value}</td>
              <td className="table-primary">{item.allocation}</td>
              <td className="table-primary" style={{ color: "red" }}>
                <a onClick={() => handleDelete(username, item.token)}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Assets onSelectAsset={handleAssetSelection} />
      <br></br>
      <button
        type="button"
        className="btn btn-danger text-center col-lg-12"
        onClick={handleLogout}
        style={{display: "flex",justifyContent: "right" ,width:"10rem"}}
      >LOGOUT</button>
    </div>
  );
};

export default Dashboard;
