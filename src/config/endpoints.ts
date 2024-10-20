
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const endpoints = {
  register: `${BASE_API_URL}/api/register`,
  getEmployerJobs: `${BASE_API_URL}/api/employer/jobs`,  
  createEmployerJob: `${BASE_API_URL}/api/employer/jobs/createJob`
  // Add more endpoints as needed
};

export default endpoints;
