const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function verify() {
  try {
    console.log('1. Logging in...');
    const loginRes = await axios.post(`${API_URL}/admin/login`, {
      email: 'jayed08@gmail.com',
      password: 'password123'
    });
    const token = loginRes.data.token;
    console.log('Logged in. Token received.');

    const headers = { Authorization: `Bearer ${token}` };

    console.log('2. Creating Project...');
    const projectRes = await axios.post(`${API_URL}/admin/projects`, {
      title: 'Test Project',
      description: 'A temporary test project',
      subDescription: ['Point 1'],
      tags: []
    }, { headers });
    const projectId = projectRes.data.id;
    console.log('Project created. ID:', projectId);

    console.log('3. Updating Project Title...');
    await axios.put(`${API_URL}/admin/projects/${projectId}`, {
      title: 'Updated Test Project',
      description: 'A temporary test project',
      subDescription: ['Point 1'],
      tags: []
    }, { headers });
    console.log('Project updated.');

    console.log('4. Verifying Public Data...');
    const publicRes = await axios.get(`${API_URL}/portfolio`);
    const project = publicRes.data.projects.find(p => p.id === projectId);
    
    if (project && project.title === 'Updated Test Project') {
      console.log('SUCCESS: Public data reflects update.');
    } else {
      console.error('FAILURE: Public data does not match.', project);
    }

    console.log('5. Cleaning up...');
    await axios.delete(`${API_URL}/admin/projects/${projectId}`, { headers });
    console.log('Project deleted.');

  } catch (error) {
    console.error('Verification Failed:', error.response ? error.response.data : error.message);
  }
}

verify();
