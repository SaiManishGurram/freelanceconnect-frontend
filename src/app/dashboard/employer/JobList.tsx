// src/components/jobs/JobList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { getEmployerJobs } from '../../../services/apiService';

// Define the job type explicitly
interface Job {
  id: number;
  title: string;
  description: string;
  skills: string;
}

const JobList: React.FC = () => {
  // Define the type for the jobs state
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getEmployerJobs();
        setJobs(jobData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No job postings found.</p>
      )}
    </div>
  );
};

export default JobList;
