import React, {  useEffect, useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import Swal from "sweetalert2";
import { IoEyeOff,IoEye, IoCopy } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import LockIcon from '@mui/icons-material/Lock';
import { ClassRounded } from "@mui/icons-material";



// import copy from "copy-to-clipboard";

const Form = ({ formDataList, setFormDataList, onEditFormSubmit }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [visiblePasswords, setVisiblPasswords]=useState({});
  const [search,setSearch]=useState("");
  const [searchprint,setSearchprint]=useState([]);
  const [data,setData]=useState([]);
  const[isPopoverOpen,setIsPopoverOpen]=useState();
  const handleAdd = () => {
    navigate("/Add");
  };

  const handleEdit = (formData) => {
    setEditFormData({...formData});
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditFormData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onEditFormSubmit(editFormData);
    toast.success("Form Edited Successfully!", { position: "top-center" }); // Show success toast
    handleCloseModal();
  };

  const handelDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedFormDataList = [...formDataList];
        const filtered = updatedFormDataList.filter(
          (e) => e !== updatedFormDataList[index]
        );
        setFormDataList(filtered);

        localStorage.setItem("formDataList", JSON.stringify(filtered));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const togglePassword = (index) => {
    setVisiblPasswords((prevVisiblePasswords) =>({
      ...prevVisiblePasswords,
      [index]: !prevVisiblePasswords[index],
    }));
  };
  console.log(visiblePasswords);

  // const handleCopyText=(e)=>{
  //   setCopyState(e.target.value);

  // };
  
  const copyClipboard=(data)=>{
    navigator.clipboard.writeText(data.Password_pin);
    // alert(`you have copied "${data.Password_pin}"`);
    toast.success("copied Successfully!", );
  };

  const handleSearch=()=>{
  
    const filtered=formDataList.filter((e)=>{const temp= e.Domain.toLowerCase().includes(search.toLocaleLowerCase())
    return temp;});
    setSearchprint(filtered);

    if(search.length!==0){
      setData(searchprint);
    }else{
      setData(formDataList);
    }
  }


  useEffect(()=>{
    handleSearch();
  },[search])

  console.log(data);
  return (
    <>
      <div className="header">
        
        <h1 className="heading"><LockIcon fontSize="large"/>Password Manager</h1>
        <div className="notification"><NotificationsIcon fontSize="large" onClick ={()=>{}} /></div>
        
      </div>
      <div className="navigation">
        <div className="search">
            <label>Search :</label>
            <input className="input" type="text" placeholder="search"
             onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div className="addbutton">
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
      <div className="body">
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th className="url">Url</th>
            <th className="username">Username</th>
            <th className="password_pin">Password/Pin</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          
          {
         
          data.length > 0 ? (
            data?.map((formData, index) => (
              <tr key={index}>
                <td>{formData.Domain}</td>
                <td><a className="link" target="/" href ={formData.Url}>{formData.Url}</a></td>
                <td>{formData.Username}</td>
                <td className="pass">{
                  visiblePasswords[index]?(
                    <span className="visible_password">{formData.Password_pin}</span>
                  ):(
                    <span className="password">{"******"}</span>
                    )}
                    {formData.password}
                    {visiblePasswords[index] ?
                    <><span  className="copy" onClick={() => copyClipboard(formData)}>
                    <IoCopy />
                    </span>
                    <span  className="eye" onClick={() => togglePassword(index)}>
                    <IoEye />
                    </span></>:
                    <span  className="eye" onClick={() => togglePassword(index)}>
                     <IoEyeOff />
                    </span>}
                  
                </td>
                <td>
                  <EditIcon fontSize="large" onClick={() => handleEdit(formData)} />
                  <DeleteIcon fontSize="large" onClick={() => handelDelete(index)} />
                </td>
              </tr>
            ))
          ) : (
            <h1>No data available</h1>
          )}
        </tbody>
      </table>
     
      </div>
      

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Edit Details</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label htmlFor="editDomain">Domain Name:</label>
                <input
                  type="text"
                  id="editDomain"
                  name="Domain"
                  value={editFormData?.Domain}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editUrl">Url:</label>
                <input
                  type="url"
                  id="editUrl"
                  name="Url"
                  placeholder="https://example.com"
                  value={editFormData?.Url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editUsername">Username:</label>
                <input
                  type="text"
                  id="editUsername"
                  name="Username"
                  value={editFormData?.Username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editPasswordPin">Password/Pin:</label>
                <input
                  type="text"
                  id="editPasswordPin"
                  name="Password_pin"
                  value={editFormData?.Password_pin}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editaccountnumber">Account Number:</label>
                <input
                  type="text"
                  id="editaccountnumber"
                  name="Accountnumber"
                  value={editFormData?.Accountnumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editifsc">IFSC Number:</label>
                <input
                  type="text"
                  id="editifsc"
                  name="ifscNumber"
                  value={editFormData?.ifscNumber}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Submit</button>
              <button type="cancel" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Form;
