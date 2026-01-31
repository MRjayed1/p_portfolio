import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Public
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

// Admin Auth
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Admin Data
export const updateAbout = async (data) => {
  const response = await axios.put(`${API_URL}/admin/about`, data, { headers: getAuthHeader() });
  return response.data;
};

// Projects
export const createProject = async (data) => {
  const response = await axios.post(`${API_URL}/admin/projects`, data, { headers: getAuthHeader() });
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await axios.put(`${API_URL}/admin/projects/${id}`, data, { headers: getAuthHeader() });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/projects/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// Experiences
export const createExperience = async (data) => {
  const response = await axios.post(`${API_URL}/admin/experiences`, data, { headers: getAuthHeader() });
  return response.data;
};

export const updateExperience = async (id, data) => {
  const response = await axios.put(`${API_URL}/admin/experiences/${id}`, data, { headers: getAuthHeader() });
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/experiences/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// Skills
export const createSkill = async (data) => {
  const response = await axios.post(`${API_URL}/admin/skills`, data, { headers: getAuthHeader() });
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/skills/${id}`, { headers: getAuthHeader() });
  return response.data;
};

// Messages
export const getMessages = async () => {
  const response = await axios.get(`${API_URL}/admin/messages`, { headers: getAuthHeader() });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await axios.delete(`${API_URL}/admin/messages/${id}`, { headers: getAuthHeader() });
  return response.data;
};
