import axios from 'axios';
require('dotenv').config();

const instance = axios.create({
  baseURL: `/api`,
});

instance.interceptors.request.use((config) => {
  config.params = {
    // add your default ones
    part: 'part',
    maxResults: 5,
    key: 'key',
    // spread the request's params
    ...config.params,
  };
  return config;
});

export default instance;
