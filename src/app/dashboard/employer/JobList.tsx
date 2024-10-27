// src/components/jobs/JobList.tsx
'use client';

import React from 'react';
import JobCard from './JobCard';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';

interface Job {
  _id: string;
  title: string;
  description: string;
  skills: [];
  salary: number;
  createdAt: string;
}

interface JobListProps {
  jobs: Job[];
  onJobDelete: (jobId: string) => void;
  onJobEdit: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobDelete, onJobEdit }) => {
  const { loading } = useLoading();

  return (
    <div>
      {loading && <Spinner />}
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job._id} job={job} onJobDelete={onJobDelete} onJobEdit={onJobEdit}/>
        ))
      ) : (
        <p>No job postings found.</p>
      )}
    </div>
  );
};

export default JobList;
