const getResultData = () => {
  const results = localStorage.getItem("formDataList");
  return results ? JSON.parse(results) : [];
};

const setResultData = (data) => {
  localStorage.setItem("formDataList", JSON.stringify(data));
};

const findString = (value, findValue) => {
  return value?.toLowerCase()?.includes(findValue?.toLowerCase());
};



export { getResultData, setResultData, findString };
