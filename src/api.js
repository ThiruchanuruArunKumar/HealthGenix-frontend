import axios from 'axios';

const API = axios.create({
  baseURL: 'https://healthgenix.onrender.com/api'
});

export default API;