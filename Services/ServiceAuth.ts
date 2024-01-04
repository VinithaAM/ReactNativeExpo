// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// // import constants from '../config/constants'

// // Set config defaults when creating the instance
// const axiosInstance = axios.create({
//   baseURL: "https://historydatacorrection.azurewebsites.net/api",
//   //withCredentials: true,
// });
// //const axiosInstance = axios.create();
// var accessToken: string;
// if (AsyncStorage) {
//   if (AsyncStorage?.getItem("LoginResponse") != null) {
//     const data: string = (await AsyncStorage.getItem("LoginResponse")) || "";
//     accessToken = await (AsyncStorage.getItem("LoginResponse") || "");
//   }
// }

// //const { token } = localStorage.getItem('').token

// // Global config for every axios `requests`
// // if(accessToken){
// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers["Access-Control-Expose-Headers"] = "Content-Disposition";
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//     config.headers["Accept"] = "application/json";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// //}
// // else{
// //     //alert("Token Not found")
// // }

// // Global config for every axios `response`
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status) {
//       const resStatus = error.response.status;

//       if (resStatus === 401) {
//         window.location.reload();
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
