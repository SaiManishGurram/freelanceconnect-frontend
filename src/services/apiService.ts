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

export const getEmployerJobs = async () => {
  return await apiRequest(endpoints.getEmployerJobs);
};

// POST request for creating a new job
export const createJob = async (jobData: {
    title: string;
    description: string;
    skills: string;
  }) => {
    return await apiRequest(endpoints.createEmployerJob, 'POST', jobData);
  };