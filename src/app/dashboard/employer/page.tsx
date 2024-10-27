// src/app/dashboard/employer/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import JobPostForm from './JobPostForm';
import JobList from './JobList';
import { getEmployerJobs } from '../../../services/apiService';
import { useLoading } from '../../../context/LoadingContext';
import ProtectedRoute from '../../components/ProtectedRoute';

interface Job {
  _id: string;
  title: string;
  description: string;
  skills: [];
  salary: number;
  createdAt: string;
}


const EmployerDashboard: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'jobPosts' | 'contracts'>('jobPosts');
  const [jobs, setJobs] = useState<Job[]>([]); // State to hold jobs
  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);
  const [isEditJob, setIsEditJob] = useState(false);
  const { setLoading } = useLoading();

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

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleToggleModal = () => {
    setIsCreating(!isCreating);
    setIsEditJob(false);

  };

  const handleTabClick = (tab: 'jobPosts' | 'contracts') => {
    setActiveTab(tab);
  };
  const handleJobPosted = (newJob: Job) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleJobDelete = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  };

  const handleJobEdit = (jobId: string) => {
    const selectedJob: any = jobs.find(job => job._id === jobId);
    setSelectedJob(selectedJob);
    setIsEditJob(true)
    setIsCreating(!isCreating);

  };
  const handleJobEdited = (jobId: string, newJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? newJob : job
      )
    );
  };



  return (
    <ProtectedRoute>
      <div className="mx-auto mt-8 p-4 px-6 sm:px-6 lg:px-36">
        {/* Job Post Form */}
        {isCreating && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{!isEditJob ? 'Post a New Job' : 'Edit Job'}</h2>
                <button onClick={handleToggleModal} className="text-gray-600 hover:text-gray-900">
                  ✕ {/* Close button */}
                </button>
              </div>
              {/* Job post form inside the modal */}
              <JobPostForm onClose={handleToggleModal} onJobPosted={handleJobPosted} onJobEditData={isEditJob ? selectedJob : undefined} onJobEdited={handleJobEdited} />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => handleTabClick('jobPosts')}
            className={`px-4 py-2 border-b-2 transition-colors focus:outline-none  ${activeTab === 'jobPosts' ? 'border-green-primary text-green-primary' : 'border-transparent text-gray-600'}`}
          >
            All job posts
          </button>
          <button
            onClick={() => handleTabClick('contracts')}
            className={`px-4 py-2 border-b-2 transition-colors  focus:outline-none ${activeTab === 'contracts' ? 'border-green-primary text-green-primary' : 'border-transparent text-gray-600 hover:text-green-secondary'}`}
          >
            All Contracts
          </button>
        </div>

        {/* Content under the tabs */}
        <div className="mt-4">
          {activeTab === 'jobPosts' && (
            <>
              <div className="md:flex md:justify-between md:items-center">
                <div className="text-xl md:text-4xl font-semibold mb-4">All job posts</div>
                <div className="mb-6 md:mb-0 w-full md:w-auto">
                  <button
                    onClick={handleToggleModal}
                    className="w-full md:w-auto px-4 py-2 bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
                  >
                    Post a new job
                  </button>
                </div>
              </div>
              <JobList jobs={jobs} onJobDelete={handleJobDelete} onJobEdit={handleJobEdit} /> {/* Pass jobs and delete handler */}
            </>
          )}
          {activeTab === 'contracts' && (
            <>
              <h2 className="text-xl font-semibold mb-4">All Contracts</h2>
              <p className="text-center">No contracts available.</p>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EmployerDashboard;
