// src/components/jobs/JobCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
import { toast } from 'react-hot-toast';
import useRelativeTime from '../../../hooks/useRelativeTime';
import JobProposalForm from './JobProposalForm'
interface JobCardProps {
  job: {
    _id: string;
    title: string;
    description: string;
    skills: [];
    salary: number;
    createdAt: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { loading, setLoading } = useLoading();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProposal, setIsProposal] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleToggleModal = () => {
    console.log('isProposal',isProposal);
    
    setIsProposal(!isProposal);
  };

  return (
    <>
    <div className="relative bg-white shadow-lg rounded-lg p-4 mb-4">
      {loading && <Spinner />}

      {/* Top section for desktop view */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 mt-2">{useRelativeTime(job.createdAt)}</p>
          <h3 className="text-lg font-semibold text-green-secondary">{job.title}</h3>
        </div>

        {/* Button positioned at the top right on larger screens */}
        <div className="hidden md:block mt-2">
          <button
            onClick={handleToggleModal}
            className="px-4 py-2 bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
          >
            Submit a Proposal
          </button>
        </div>
      </div>

      {/* Job description and skills section */}
      <p className="text-gray-600 mt-2">Budget: ₹{job.salary}</p>
      <div>
        <p className={`text-gray-600 mt-2 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {job.description}
        </p>
        {job.description.length > 100 && (
          <button
            onClick={toggleExpanded}
            className="text-green-primary hover:text-green-secondary underline mt-1 cursor-pointer"
          >
            {isExpanded ? 'less' : 'more'}
          </button>
        )}
      </div>
      <div className="flex flex-wrap mt-5">
        {job.skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-600 rounded-full px-3 py-1 mr-2 mb-2"
          >
            <span>{skill}</span>
          </div>
        ))}
      </div>

      {/* Button positioned at the bottom and full-width on mobile view */}
      <div className="block md:hidden mt-4">
        <button
          onClick={handleToggleModal}
          className="w-full px-4 py-2 bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
        >
          Submit a Proposal {isProposal}
        </button>
      </div>
    </div>

      {/* Submit Proposal Form */}
      {isProposal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Proposal</h2>
              <button onClick={handleToggleModal} className="text-gray-600 hover:text-gray-900">
                ✕ {/* Close button */}
              </button>
            </div>
            {/* Job post form inside the modal */}
            <JobProposalForm onClose={handleToggleModal} jobId={job._id}/>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
