// src/services/apiService.ts
import { getAuth } from "firebase/auth";
import endpoints from '@/config/endpoints';
// import { initFirebase } from './firebase';

// initFirebase();

const apiRequest = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not authenticated');
  }

  const token = await user.getIdToken();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,  // Send the Firebase token
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,  // Pass the body if present
  };

  const response = await fetch(`${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};

//EMPLOYER APIs
export const getEmployerJobs = async () => {
  return await apiRequest(endpoints.getEmployerJobs);
};

export const createJob = async (jobData: {
  title: string;
  description: string;
  skills: string[];
  salary: number | null;
}) => {
  return await apiRequest(endpoints.createEmployerJob, 'POST', jobData);
};

export const deleteJob = async (job: any) => {
  return await apiRequest(endpoints.deleteEmployerJob + job._id, 'DELETE');
};

export const updateJob = async (jobId: any, jobData: any) => {
  return await apiRequest(endpoints.updateEmployerJob + jobId, 'PUT', jobData);
}; 

//FREELANCER APIs
export const getFreelancerAllJobs = async () => {
  return await apiRequest(endpoints.getFreelancerAllJobs);
};

export const freelancerSubmitProposal = async (jobProposalData: any) => {
  return await apiRequest(endpoints.submitProposal,'POST',jobProposalData);
};

export const getFreelancerProposals = async () => {
  return await apiRequest(endpoints.getFreelancerProposals);
};

export const deleteFreelancerProposal = async (proposalId: any) => {
  return await apiRequest(endpoints.deleteFreelancerProposal + proposalId, 'DELETE');
};