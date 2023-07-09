import React, { useState } from "react";

const MyForm = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  const handleAddClick = () => {
    // Perform the desired action when the "Add" button is clicked
    console.log(`Input 1: ${input1}`);
    console.log(`Input 2: ${input2}`);
    // Reset the input fields
    setInput1("");
    setInput2("");
  };

  return (
    <div className="container">
      <h3 className="text-body-secondary mb-4 text-center">ADD AN ASSEST</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="input1">Token</label>
            <input
              type="text"
              className="form-control"
              id="input1"
              value={input1}
              onChange={handleInput1Change}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="input2">Quantity</label>
            <input
              type="text"
              className="form-control"
              id="input2"
              value={input2}
              onChange={handleInput2Change}
            />
          </div>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={handleAddClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
