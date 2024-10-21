// src/components/jobs/JobCard.tsx
'use client';

import React from 'react';
import { deleteJob } from '../../../services/apiService';

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    description: string;
    skills: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const handleEditJob = () => {
    // Logic for editing the job
    console.log(`Edit job with ID: ${job._id}`);
  };

  const handleDeleteJob = async() => {
    // Logic for deleting the job
    console.log(`Delete job with ID: ${job._id}`);

    await deleteJob(job);

  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p><strong>Required Skills:</strong> {job.skills}</p>
      <button onClick={handleEditJob}>Edit</button>
      <button onClick={handleDeleteJob}>Delete</button>
    </div>
  );
};

export default JobCard;
