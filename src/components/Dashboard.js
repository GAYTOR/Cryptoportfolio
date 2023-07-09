import React from "react";
import Assets from "./Assets"; // Import the Forum component

const Dashboard = () => {
  return (
    <div>
        <h3 className="text-body-secondary mb-4 text-center">
            DASHBOARD
          </h3>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Qty. Owned</th>
            <th scope="col">Price</th>
            <th scope="col">Total Value</th>
            <th scope="col">Allocation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-primary">Value 1</td>
            <td className="table-primary">Value 2</td>
            <td className="table-primary">Value 3</td>
            <td className="table-primary">Value 4</td>
            <td className="table-primary">Value 5</td>
          </tr>
          
        </tbody>
      </table>
     
          <Assets/>
    </div>
  );
};

export default Dashboard;
