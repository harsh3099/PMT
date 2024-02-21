import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/form.css";
import NoteContext from "../NoteContext";
import { ToastContainer, toast } from "react-toastify";

// import { getResultData, setResultData,data } from "../helper";
 

const AddEditForm = () => {
  const { id } = useParams();
  const a=useContext(NoteContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    id: 1,
    domainName: "",
    domainUrl: "",
    username: "",
    password: "",
    pin:"",
    accountNumber: "",
    ifscCode: "",
    transactionpassword:""
  });
  const tdata={
    id: 1,
    domainName: "",
    domainUrl: "",
    username: "",
    password: "",
    pin:"",
    accountNumber: "",
    ifscCode: "",
    transactionpassword:""
  };

  const handleSubmit = (e) => {
    // console.log(formData);
    e.preventDefault();
    const _lData = a.getResultData();
    if(!parseInt(id)){
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
    //
    console.log(_lData);
    a.setResultData(_lData);
    navigate("/");
   
  };


  useEffect(()=>{
    if(a.data.domainName.length>0){
      setFormData(a.data);
    }else{
      setFormData(tdata);
    }
  },[])
  const handleCancel=()=>{
    localStorage.setItem("formDataList",JSON.stringify([...a.formData]));
    a.setData(tdata);
    navigate("/");
  }

  const onTextChange = (val, key) => {
    setFormData({ ...formData, [key]: val });
  };
  const renderFields = () => {
    switch (selectedCategory) {
      case "bankAccount":
        return (
          <>
            <div className="form-group">
              <label htmlFor="Url">Url:</label>
              <input required type="url" placeholder="https://example.com" 
              value={domainUrl}
              onChange={(e) => {
                onTextChange(e.target.value, "domainUrl");
              }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input required type="text" 
              value={username}
              onChange={(e)=>{
                onTextChange(e.target.value,"username");
              }} />
            </div>
            <div className="form-group">
              <label htmlFor="Password_pin">Password:</label>
              <input
                required
                type="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
                value={password}
                placeholder="Example@123"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
              <div className="form-group">
                <label htmlFor="Accountnumber">Account Number:</label>
                <input
                  required
                  type="text"
                  value={accountNumber}
                  onChange={(e) => {
                    onTextChange(e.target.value, "accountNumber");
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ifscNumber">IFSC Code:</label>
              <input required 
              type="text"  
               value={ifscCode}
               onChange={(e) => {
                 onTextChange(e.target.value, "ifscCode");
               }}/>
            </div>
            <div className="form-group">
              <label htmlFor="transctionPassword">Transaction Password:</label>
              <input required type="password" id="transctionPassword" name="transctionPassword" 
               value={ transactionpassword}
               placeholder="Example@123"
               onChange={(e) => {
                 onTextChange(e.target.value, "transactionpassword");
               }}
              />
            </div>
          </>
        );
      case "socialMedia":
        return (
          <>
            <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="url"
                id="Url"
                name="Url"
                placeholder="https://example.com"
                value={domainUrl}
                onChange={(e) => {
                  onTextChange(e.target.value, "domainUrl");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
                value={username}
                onChange={(e) => {
                  onTextChange(e.target.value, "username");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
                value={password}
                placeholder="Example@123"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
            </div>
          </>
        );
      case "atm":
        return (
          <>
            <div className="form-group">
              <label htmlFor="password">Pin:</label>
              <input
                required
                type="password"
                pattern="[0-9]{4}"
                value={password}
                placeholder="pin must be 4 digit"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
            </div>
          </>
        );
      case "otts":
        return (
          <>
            <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="url"
                placeholder="https://example.com"
                value={formData.domainUrl}
                onChange={(e) => {
                  onTextChange(e.target.value, "domainUrl");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input required type="text" 
              value={username}
              onChange={(e)=>{
                onTextChange(e.target.value,"username");
              }} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
                value={password}
                placeholder="Example@123"
                onChange={(e) => {
                  onTextChange(e.target.value, "password");
                }}
              />
            </div>
           
          </>
        );

      default:
        return null;
    }
  };

  const navigate = useNavigate();

  const {  domainName,domainUrl,password,username,accountNumber,ifscCode,transactionpassword } = formData;
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Category:</label>
          <select
            className="select1"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="bankAccount">Banking Details</option>
            <option value="socialMedia">Social Media</option>
            <option value="atm">ATMs Details</option>
            <option value="otts">OTTs Platform</option>
          </select>
        </div>
        {renderFields()}
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
            onClick={handleCancel}
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
