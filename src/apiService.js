import axios from 'axios';

const API_KEY = 'f410e654-34a3-48da-b5ae-b7a1ee186b2b';
const API_BASE = 'https://airlabs.co/api/v9/';

const apiCall = async (method, params = {}) => {
  try {
    params.api_key = API_KEY;
    const response = await axios.post(`${API_BASE}${method}`, params);
    return response.data;
  } catch (error) {
    console.error('There was an error during the API call:', error);
    throw error;
  }
};

export default {
  apiCall,
};
