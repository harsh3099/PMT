import { useState } from "react"
import NoteContext from "./NoteContext";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";



const Helper=(props)=>{
  const navigate=useNavigate();
  const [data,setData]=useState({
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
  
  
  const [formData ,setFormData]=useState([]);
 

  const getResultData = () => {
    const results = localStorage.getItem("formDataList");
    const temp=JSON.parse(results);
    setFormData(temp);
    return results ? JSON.parse(results) : [];
  };
  
  const setResultData = (data) => {
    localStorage.setItem("formDataList", JSON.stringify(data));
  };
  
  const findString = (value, findValue) => {
    return value?.toLowerCase()?.includes(findValue?.toLowerCase());
  };

  const handleEdit = (id) => {
      const ind = formData.findIndex(
        (element) => element.id === id
      );
      if (ind !== -1) {
        const filtered = formData.filter((e, index) => index !== ind);
        // const sortedData = sortData(filtered);
        const temp = formData[ind];
        // setPrint(sortedData);
        setData(temp);
        navigate("/form");
        
        localStorage.setItem("formDataList", JSON.stringify(filtered));
        toast.success("edit Successfully!");
        
      }
    };

  
    return (<div><NoteContext.Provider value={{
      handleEdit,
      findString,
      setResultData,
      getResultData,
      setData,
      setFormData,
      formData,
      data
    }}>
      {props.children}
    </NoteContext.Provider> 
    <ToastContainer/>
    </div>
   
);
}




export default Helper;
