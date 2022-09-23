import axios from "axios";

const feriaApi = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3000/api`,
});

feriaApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: localStorage.getItem("token"),
    AppUrl: window.location.origin,
  };

  return config;
});

export default feriaApi;
