// src/components/jobs/JobPostForm.tsx
'use client';

import React, { useState } from 'react';
import { createJob } from '../../../services/apiService';

const JobPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send job data to the backend (via WebSockets or API)
    console.log({ title, description, skills });

    try {
        const jobData = { title, description, skills };
        await createJob(jobData);
        // Optionally reset the form or redirect after successful submission
        setTitle('');
        setDescription('');
        setSkills('');
        alert('Job posted successfully!');
    } catch (err) {
        setError((err as Error).message);
    }
    // Clear form after submission
    setTitle('');
    setDescription('');
    setSkills('');
  };

  return (
    <div>
      <h3>Create New Job</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter job title"
            required
          />
        </div>
        <div>
          <label>Job Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job description"
            required
          />
        </div>
        <div>
          <label>Required Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter required skills (comma-separated)"
            required
          />
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostForm;
