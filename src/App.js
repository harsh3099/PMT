import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import Add from "./AddinForm/Add";
import Home from "./Components/Home";
import NoteContext from "./NoteContext";
import Helper from "./helper";
import { ToastContainer } from "react-toastify";

const App = () => {
//   const [formDataList, setFormDataList] = useState(() => {
//     const savedData = localStorage.getItem("formDataList");
//     return savedData ? JSON.parse(savedData) : [];
//   });

//   const handleFormSubmit = (formData) => {
//     setFormDataList([...formDataList, formData]);
//   };

//   const handleEditFormSubmit = (editedFormData) => {
//     const updatedFormDataList = formDataList.map((formData) => {
//       if (formData.id === editedFormData.id) {
//         return editedFormData;
//       } else {
//         return formData;
//       }
//     });
//     setFormDataList(updatedFormDataList);
//   };
//   useEffect(() => {
//     localStorage.setItem("formDataList", JSON.stringify(formDataList));
//   }, [formDataList]);
  return (
    <div>
      <Router>
        <Helper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Form?/:id" element={<Form />} />
        </Routes>
        </Helper>
      </Router>
      <ToastContainer/>
    </div>
  );
};

export default App;
