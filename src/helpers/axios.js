import axios from "axios";

const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;
const token = "2|nBjZf0eEbNtPdcyvSzNztoXenyV3lVokvuYmgSMM";
const axiosInstance = axios.create(
  { baseURL },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }
);

export default axiosInstance;
