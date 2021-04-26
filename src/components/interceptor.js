
var axios = require("axios");

export const jwtToken = localStorage.getItem("token");

// request interceptor
axios.interceptors.request.use(
  (config)=> {
    if (jwtToken) {
      config.headers["Authorization"] = (jwtToken);
      console.log(jwtToken);
    }
    return config;
  },
  (err) => {
      console.log("failed ::" + err);
      alert("Please log in and try again!")
    return Promise.reject(err);
  }
);