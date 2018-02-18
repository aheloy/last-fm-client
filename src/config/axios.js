import axios from 'axios';


const API_KEY = 'd739eec34eda35b701607f170676cef3';

axios.defaults.baseURL = 'https://ws.audioscrobbler.com/2.0/';

axios.interceptors.request.use((config) => {
  config.params.api_key = API_KEY;
  return config;
});
