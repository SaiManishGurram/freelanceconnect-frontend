'use client';

import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
import { getFreelancerAllJobs } from '../../../services/apiService';

interface Job {
  _id: string;
  title: string;
  description: string;
  skills: [];
  salary: number;
  createdAt: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // State to hold jobs
  const { loading } = useLoading();
  const { setLoading } = useLoading();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobData = await getFreelancerAllJobs();
      setJobs(jobData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  
  return (
    <div className="md:justify-between md:items-center">
      <div className="text-xl md:text-4xl font-semibold mb-4">Jobs you might like </div>

      <div>
        {loading && <Spinner />}
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <p>No job postings found.</p>
        )}
      </div>

    </div>



  );
};

export default JobList;
