
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const endpoints = {
  register: `${BASE_API_URL}/api/register`,
  getEmployerJobs: `${BASE_API_URL}/api/employer/jobs`,  
  createEmployerJob: `${BASE_API_URL}/api/employer/jobs/createJob`,
  deleteEmployerJob: `${BASE_API_URL}/api/employer/jobs/deleteJob/`,
  updateEmployerJob: `${BASE_API_URL}/api/employer/jobs/updateJob/`,
  getFreelancerAllJobs: `${BASE_API_URL}/api/freelancer/jobs`,
  submitProposal: `${BASE_API_URL}/api/freelancer/proposals/submitProposal`,
  getFreelancerProposals: `${BASE_API_URL}/api/freelancer/proposals/getSubmittedProposals`,
  deleteFreelancerProposal: `${BASE_API_URL}/api/freelancer/proposals/deleteProposal/`
};

export default endpoints;
