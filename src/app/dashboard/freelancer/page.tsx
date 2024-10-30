'use client'
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import JobList from './JobList'
import ProposalList from './ProposalList';
const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState<'jobPosts' | 'myProposals'>('jobPosts');

  const handleTabClick = (tab: 'jobPosts' | 'myProposals') => {
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
          <button
            onClick={() => handleTabClick('myProposals')}
            className={`px-4 py-2 border-b-2 transition-colors focus:outline-none  ${activeTab === 'myProposals' ? 'border-green-primary text-green-primary' : 'border-transparent text-gray-600'}`}
          >
            My Proposals
          </button>
        </div>

        {/* Content under the tabs */}
        <div className="mt-4">
          {activeTab === 'jobPosts' && (
            <JobList />
          )}
          {activeTab === 'myProposals' && (
            <ProposalList />
          )}
        </div>
      </div>

    </ProtectedRoute>
  );
};

export default FreelancerDashboard;
