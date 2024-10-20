// src/app/dashboard/employer/page.tsx
'use client';

import React, { useState } from 'react';
import JobPostForm from './JobPostForm';
import JobList from './JobList';
import ProtectedRoute from '../../components/ProtectedRoute';

const EmployerDashboard: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleToggleCreateJob = () => {
    setIsCreating(!isCreating);
  };

  return (
    <ProtectedRoute>
    <div>
      <h1>Employer Dashboard</h1>

      <button onClick={handleToggleCreateJob}>
        {isCreating ? 'Cancel' : 'Create New Job'}
      </button>

      {isCreating && <JobPostForm />}

      <h2>Your Job Postings</h2>
      <JobList />
    </div>
    </ProtectedRoute>
  );
};

export default EmployerDashboard;
