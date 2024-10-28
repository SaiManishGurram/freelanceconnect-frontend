'use client'
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import JobList from './jobList'
const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'jobPosts' | 'contracts'>('jobPosts');


  const handleTabClick = (tab: 'jobPosts') => {
    setActiveTab(tab);
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto mt-8 p-4 px-6 sm:px-6 lg:px-36">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => handleTabClick('jobPosts')}
            className={`px-4 py-2 border-b-2 transition-colors focus:outline-none  ${activeTab === 'jobPosts' ? 'border-green-primary text-green-primary' : 'border-transparent text-gray-600'}`}
          >
            Jobs you might like
          </button>
        </div>
        <div className="mt-4">
          {activeTab === 'jobPosts' && (
              <JobList />
          )}
        </div>
      </div>

    </ProtectedRoute>
  );
};

export default FreelancerDashboard;
