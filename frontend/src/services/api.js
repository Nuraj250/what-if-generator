import axios from 'axios';

const API_URL = 'http://localhost:5000/api/what-if';

export const generateWhatIf = async (text) => {
  const response = await axios.post(API_URL, { text });
  return response.data;
};
