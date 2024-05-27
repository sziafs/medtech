import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:9000/.netlify/functions/api',
    baseURL: 'https://bethehero-api.netlify.app/.netlify/functions/api'
});

export default api;