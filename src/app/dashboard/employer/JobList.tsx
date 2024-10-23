// src/components/jobs/JobList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { getEmployerJobs } from '../../../services/apiService';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
// Define the job type explicitly
interface Job {
  _id: string;
  title: string;
  description: string;
  skills: string;
}

const JobList: React.FC = () => {
  // Define the type for the jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const jobData = await getEmployerJobs();
        setJobs(jobData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      ) : (
        <p>No job postings found.</p>
      )}
    </div>
  );
};

export default JobList;
