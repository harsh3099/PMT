import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import "../styles/home.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import Swal from "sweetalert2";
import { IoEyeOff, IoEye, IoCopy } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import LockIcon from "@mui/icons-material/Lock";
import { ClassRounded } from "@mui/icons-material";
import { findString, getResultData } from "../helper";

const Home = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState([]);
  const [localData, setLocalData] = useState();
  const fetchData = () => {
    setResultData(getResultData());
    setLocalData(getResultData())
  };

  const handleSearch = (value) => {
    const filtered = localData.filter((e) => {
     return findString(e.domainName,value) || findString(e.domainUrl,value)    
    });
    setResultData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);



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
        <div className="notification">
          <NotificationsIcon fontSize="large" onClick={() => {}} />
        </div>
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
          <button onClick={(e)=>{ navigate("/Form")}}>Add</button>
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
            {resultData?.length &&
              resultData?.map((item, index) => {
                const { domainName, domainUrl, username, id } = item;
                return (
                  <tr key={index}>
                    <td>{domainName}</td>
                    <td>
                      <a className="link" target="/" href={domainUrl}>
                        {domainUrl}
                      </a>
                    </td>
                    <td>{username}</td>
                    <td className="pass"></td>
                    <td>
                      <EditIcon fontSize="large" onClick={() => navigate(`/Form/${id}`)}/>
                      <DeleteIcon fontSize="large" onClick={() => handelDelete(id)}/>
                    </td>
                  </tr>
                );
              })}
            {!resultData && (
              <tr>
                {" "}
                <td>No data available</td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
