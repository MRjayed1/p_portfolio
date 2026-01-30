import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPortfolioData = async () => {
  try {
    const response = await axios.get(`${API_URL}/portfolio`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
};

export const submitContactMessage = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact message:', error);
    throw error;
  }
};
