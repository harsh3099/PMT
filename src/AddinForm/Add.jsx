import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import  {IoEyeOff,IoEye} from "react-icons/io5";



const Add = ({onFormSubmit}) => {
  const [selectedCategory,setSelectedCategory]=useState("");
  const[type,setType]=useState("password");
  const[icon,setIcon]=useState(<IoEyeOff/>);
  const [formData,setFormData]= useState({
    Domain:"",
    Url:"",
    Username:"",
    Password_pin:"",
    Accountnumber:"",
    ifscNumber:""
    // Action:"",
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = {
    //   Domain: e.target.elements.Domain.value || "",
    // Url: e.target.elements.Url.value || "",
    // Username: e.target.elements.Username.value || "",
    // Password_pin: e.target.elements.Password_pin.value || "",
    // Accountnumber: e.target.elements.Accountnumber.value || "",
    // ifscNumber: e.target.elements.ifscNumber.value || "",
    // isPaswdVisible:false
    // };
    onFormSubmit(formData);
    localStorage.setItem("formDataList",JSON.stringify(formData));
    navigate("/")
  };

  const onTextChange=(val,key)=>{
    setFormData({...formData,[key]:val?val:""
  })
  }

  const navigate = useNavigate();
  const handleCancel=()=>{
    navigate('/');
    setSelectedCategory("");
    setFormData({
      Domain:"",
      Url:"",
      Username:"",
      Password_pin:"",
      Accountnumber:"",
      ifscNumber:"",
      // Action:"",
    });
   
  };
    const renderFields = () => {
      switch (selectedCategory){
        case "bankAccount":
          return(
            <>
           <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
              />
           </div>
           <div className="form-group">
              <label htmlFor="Url">Url:</label>
              <input
                required
                type="url"
                id="Url"
                name="Url"
                placeholder='https://example.com'
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
              />
            </div>
              <div className="form-group">
               <label htmlFor="Password_pin">Password:</label>
               <input
                 required
                 type="password"
                 pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
                 id="Password_pin"
                 name="Password_pin"

               />
            <div className="form-group">
              <label htmlFor="Accountnumber">Account Number:</label>
              <input
                required
                type="text"
                id="Accountnumber"
                name="Accountnumber"
              />
            </div>
            </div>
            <div className="form-group">
              <label htmlFor="ifscNumber">IFSC Number:</label>
              <input required type="text" id="ifscNumber" name="ifscNumber" />
            </div>
            <div className="form-group">
              <label htmlFor="pinCode">PIN Code:</label>
              <input required type={type} id="pinCode" name="pinCode" />
            </div>
            
            
            </> 
          );
          case "socialMedia":
            return(
              <>
               <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
                value={formData.Domain}
                onChange={(e)=>{onTextChange(e.target.value,'Domain')}}
              />
           </div>
           <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="url"
                id="Url"
                name="Url"
                placeholder='https://example.com'
                value={formData.Url}
                onChange={(e)=>{onTextChange(e.target.value,'Url')}}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
                value={formData.Username}
                onChange={(e)=>{onTextChange(e.target.value,'Username')}}
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
                 value={formData.Password_pin}
                 onChange={(e)=>{onTextChange(e.target.value,'Password_pin')}}
               />
               </div>
              </>
            );
            case "atm":
            return(
              <>
               <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
                value={formData.Domain}
                onChange={(e)=>{onTextChange(e.target.value,'Domain')}}
              />
           </div>
            <div className="form-group">
               <label htmlFor="password">Pin:</label>
               <input
                 required
                 type="password"
                 id="password"
                 name="password"
                 pattern='[0-9]{4}'
                 value={formData.Password_pin}
                onChange={(e)=>{onTextChange(e.target.value,'Password_pin')}}
               />
               </div>
           
              </>
            );
            case "otts":
            return(
              <>
               <div className="form-group">
           <label htmlFor="Domain">Domain Name:</label>
              <input
                required
                type="text"
                id="Domain"
                name="Domain"
                value={formData.Domain}
                onChange={(e)=>{onTextChange(e.target.value,'Domain')}}
              />
           </div>
           <div className="form-group">
              <label htmlFor="url">Url:</label>
              <input
                required
                type="url"
                id="Url"
                name="Url"
                placeholder='https://example.com'
                value={formData.Url}
                onChange={(e)=>{onTextChange(e.target.value,'Url')}}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username:</label>
              <input
                required
                type="text"
                id="Username"
                name="Username"
                value={formData.Username}
                onChange={(e)=>{onTextChange(e.target.value,'Username')}}
              />
            </div>
            <div className="form-group">
               <label htmlFor="password">Password:</label>
               <input
                 required
                 type="password"
                 id="password"
                 name="password"
                 pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,12}$"
                 value={formData.Password_pin}
                 onChange={(e)=>{onTextChange(e.target.value,'Password_pin')}}
               />
               </div>
           
              </>
            );
           
          default:
            return null
      }
    }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select
            className="select1"
            id="category"
            name="category"
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
        
        <div className="buttons-container">
          <button type='button'
          className='cancel-button'
          onClick={handleCancel}>Cancel</button>
          <button type='submit'
          className='submit-button'
          >Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Add;
