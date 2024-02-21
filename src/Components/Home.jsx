import { useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
import "../styles/home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { toast,ToastContainer } from "react-toastify"; // Import ToastContainer
import Swal from "sweetalert2";
import { IoEyeOff, IoEye, IoCopy } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import LockIcon from "@mui/icons-material/Lock";
import { ClassRounded, Password } from "@mui/icons-material";
// import { findString, getResultData, handleEdit } from "../helper";
import NoteContext from "../NoteContext";

const Home = () => {
  const navigate = useNavigate();
  const a=useContext(NoteContext);
  const [resultData, setResultData] = useState([]);
  const [localData, setLocalData] = useState([]);
  const[visiblePasswords,setVisiblPasswords]=useState({});
  const fetchData = () => {
    setResultData(a.getResultData());
    setLocalData(a.getResultData())
  };
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

  const handleSearch = (value) => {

     const filtered = localData.filter((e) => {
     return a.findString(e.domainName,value) || a.findString(e.domainUrl,value)    
    });
    setResultData(filtered);
  };
  useEffect(() => {
    console.log("fetching data")
    fetchData();
  }, []);

  const togglePassword = (index) => {
    setVisiblPasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [index]: !prevVisiblePasswords[index],
    }));
  };
  console.log(visiblePasswords);

  const copyClipboard = (data) => {
    navigator.clipboard.writeText(data.password || data.pin);
    toast.success("copied Successfully!");
    
  };
 
  const handelAdd=()=>{
    a.setData(tdata);
    navigate("/Form");
  }

  const handelDelete = (id) => {
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
        const newData = localData.filter(
          (e) => e.id !== id
        );
        localStorage.setItem("formDataList", JSON.stringify(newData));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        fetchData();
      }
    });
  };

  return (
    <>
      <div className="header">
        <h1 className="heading">
          <LockIcon fontSize="large" />
          Password Manager
        </h1>
        {/* <div className="notification">
          <NotificationsIcon fontSize="large" onClick={() => {}} />
        </div> */}
      </div>
      <div className="navigation">
        <div className="search">
          <label>Search :</label>
          <input
            className="input"
            type="text"
            placeholder="search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="addbutton">
          <button onClick={(e)=>{ handelAdd()}}>Add</button>
        </div>
      </div>
      <div className="body">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="url">Url</th>
              <th className="username">Username</th>
              <th className="password_pin">Password/Pin</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {resultData?.length ?
              resultData?.map((item, index) => {
                const { domainName, domainUrl, username, id, password, pin,transactionpassword } = item;
                return (
                  <tr key={index}>
                    <td>{domainName}</td>
                    <td>
                      <a className="link" target="/" href={domainUrl}>
                        {domainUrl}
                      </a>
                    </td>
                    <td>{username}</td>
                    <td className="pass">
                    {visiblePasswords[index] ? (
                      <span className="visible_password">
                        {password || pin  || transactionpassword}
                      </span>
                    ) : (
                      <span className="password">{"******"}</span>
                    )}
                    
                    {visiblePasswords[index] ? (
                      <>
                        <span
                          className="copy"
                          onClick={() => copyClipboard(item)}
                        >
                          <IoCopy />
                        </span>
                        <span
                          className="eye"
                          onClick={() => togglePassword(index)}
                        >
                          <IoEye />
                        </span>
                      </>
                    ) : (
                      <span
                        className="eye"
                        onClick={() => togglePassword(index)}
                      >
                        <IoEyeOff />
                      </span>
                    )}
                  </td>
                    {/* <td className="pass">{password || pin}</td> */}
                    <td >
                      <div className="action">
                      <EditIcon fontSize="medium" onClick={() => a.handleEdit(id)}/>
                      <DeleteIcon fontSize="medium" onClick={() => handelDelete(id)}/>
                      </div>
                    </td>
                  </tr>
                );
              })
              : <tr>
                <td colSpan={5} className="p-5" style={{textAlign: 'center'}}><h1>No data available</h1></td>{" "}
              </tr>
              }
        
          </tbody>
        </table>
       
      </div>
      <ToastContainer/>
    </>
    
  );
};

export default Home;
