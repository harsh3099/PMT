import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/form.css";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { getResultData, setResultData } from "../helper";
 

const AddEditForm = () => {
  const { id } = useParams();
  


  const [formData, setFormData] = useState({
    id: 1,
    formType: "",
    domainName: "",
    domainUrl: "",
    username: "",
    password: "",
    accountNumber: "",
    ifscCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const _lData = getResultData();
    if(!id){
        if (_lData.length) {
            formData.id = Number(_lData[_lData.length - 1].id) + 1;
          }
          _lData.push(formData);
    }    
    else if(_lData.length && id){
        let index = _lData.findIndex(obj => obj.id == id);
        if (index !== -1) {
            _lData[index] = formData;
          }
        
    }   
    setResultData(_lData);
    navigate("/");
  };

  const onTextChange = (val, key) => {
    setFormData({ ...formData, [key]: val ? val : "" });
  };

  const navigate = useNavigate();

  const { formType, domainName } = formData;
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Category:</label>
          <select
            className="select1"
            value={formType}
            onChange={(e) => onTextChange(e.target.value, "formType")}
          >
            <option value="">Select Category</option>
            <option value="bankAccount">Banking Details</option>
            <option value="socialMedia">Social Media</option>
            <option value="atm">ATMs Details</option>
            <option value="otts">OTTs Platform</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Domain">Name:</label>
          <input
            type="text"
            value={domainName}
            onChange={(e) => onTextChange(e.target.value, "domainName")}
          />
        </div>

        <div className="buttons-container">
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditForm;
