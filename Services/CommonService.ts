import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig } from "axios";

//apiSerive for login

const url = "https://historydatacorrection.azurewebsites.net/api";
//const token = await AsyncStorage.getItem("LoginResponse");
const headers = {
  "Content-Type": "application/json",
  //Authorization: `Bearer ${token}`,
  // Accept: "application/json",
};
const requestConfig: AxiosRequestConfig = {
  headers: headers,
};

const fetchUser = async () => {
  const configurationObject = {
    method: "get",
    url: "https://jsonplaceholder.typicode.com/comments?postId=1",
  };
  const response = await axios(configurationObject);
};

export const login = async (loginDetails: any) => {
  try {
    const result = await axios.post(
      url + `/Login`,
      loginDetails,
      requestConfig
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
  // return axios.post(url, loginDetails, requestConfig);
};
export const getWeather = () => {
  return axios.get("https://localhost:44354/weatherforecast");
};

// apiService for Singup
export const register = async (loginDetails: any) => {
  try {
    const result = await axios.post(
      url + `/Login/Create`,
      loginDetails,
      requestConfig
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
};
// tokenrefesh
// export const refreshToken = () => {
//   const loginresponse = JSON.parse(localStorage.getItem("LoginResponse") || "");
//   const userId = loginresponse.id;
//   return axiosInstance.get("http://localhost:7028/api/Login/TokenRefresh", {
//     params: {
//       id: userId,
//     },
//   });
// };
// apiService for HistoryData
export const getHistoryCorrection = async () => {
  const token = await AsyncStorage.getItem("LoginResponse");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    // Accept: "application/json",
  };
  const requestConfig: AxiosRequestConfig = {
    headers: headers,
  };
  //console.log("requestConfig", requestConfig, url);
  try {
    const result = await axios.get(url + "/HistoryData/Get", requestConfig);
    return result;
  } catch (error) {
    return error.response;
  }
  //   await refreshToken().then((result) => {
  //    localStorage.setItem("LoginResponse", JSON.stringify(result.data.data));
  //  });
  //return axiosInstance.get("/HistoryData/Get");
};
export const MasterHistoryData = async () => {
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `${token}`,
  //   // Accept: "application/json",
  // };
  const requestConfig: AxiosRequestConfig = {
    headers: headers,
  };
  //console.log("requestConfig", requestConfig, url);
  try {
    const result = await axios.get(
      url + "/MasterHistoryData/Get",
      requestConfig
    );
    //.log("result", result);
    return result;
  } catch (error) {
    console.log("err", error);
    return error.response;
  }
};
// API Call for New item add
export const AddNewItem = async (ItemDetails: any) => {
  try {
    const result = await axios.post(
      url + `/HistoryData/Create`,
      ItemDetails,
      requestConfig
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
};
export const updateCorrectionDetails = async (updateDetails: any) => {
  try {
    const result = await axios.put(
      url + `/HistoryData/Update`,
      updateDetails,
      requestConfig
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteCorrection = async (id: any) => {
  try {
    const result = await axios.delete(
      url + `/HistoryData/Delete?id=${id}`,
      requestConfig
    );
    return result;
  } catch (error) {
    return error.response.data;
  }
};
// export const getMasterHistoryData = async () => {
//   // await refreshToken().then((result) => {
//   //   localStorage.setItem("LoginResponse", JSON.stringify(result.data.data));
//   // });
//   return axiosInstance.get("http://localhost:7028/api/MasterHistoryData/Get");
// };

// export const searchDetails = async (searchtext: any) => {
//   // await refreshToken().then((result) => {
//   //   localStorage.setItem("LoginResponse", JSON.stringify(result.data.data));
//   // });
//   return axiosInstance.get(
//     "http://localhost:7028/api/HistoryData/GetBySearch",
//     {
//       params: {
//         searchtext: searchtext,
//       },
//     }
//   );
// };
// export const createCorrectionDetails = async (savedetails: any) => {
//   // await refreshToken().then((result) => {
//   //   localStorage.setItem("LoginResponse", JSON.stringify(result.data.data));
//   // });
//   return axiosInstance.post(
//     "http://localhost:7028/api/HistoryData/Create",
//     savedetails
//   );
// };
