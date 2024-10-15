
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const endpoints = {
  register: `${BASE_API_URL}/api/register`,
  login: `${BASE_API_URL}/api/login`,
  getJobs: `${BASE_API_URL}/api/jobs`,
  postJob: `${BASE_API_URL}/api/jobs`,
  // Add more endpoints as needed
};

export default endpoints;
