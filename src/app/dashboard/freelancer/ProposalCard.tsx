// src/components/jobs/JobCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
import { toast } from 'react-hot-toast';
import useRelativeTime from '../../../hooks/useRelativeTime';
import JobProposalForm from './JobProposalForm'
interface JobCardProps {
  proposal:any;
  delteProposal: (jobId: string) => void;
}

const ProposalCard: React.FC<JobCardProps> = ({ proposal, delteProposal }) => {
  const { loading, setLoading } = useLoading();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProposal, setIsProposal] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleDeleteProposal = () => {    
    delteProposal(proposal._id);
  };

  return (
    <>
    <div className="relative bg-white shadow-lg rounded-lg p-4 mb-4">
      {loading && <Spinner />}

      {/* Top section for desktop view */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 mt-2">{useRelativeTime(proposal.jobId.createdAt)}</p>
          <h3 className="text-lg font-semibold text-green-secondary">{proposal.jobId.title}</h3>
        </div>

        {/* Button positioned at the top right on larger screens */}
        <div className="hidden md:block mt-2">
          <button
            onClick={handleDeleteProposal}
            className="px-4 py-2 bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
          >
            Decline Proposal
          </button>
        </div>
      </div>

      {/* Job description and skills section */}
      <p className="text-gray-600 mt-2">Budget: ₹{proposal.jobId.salary}</p>
      <div>
        <p className={`text-gray-600 mt-2 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {proposal.jobId.description}
        </p>
        {proposal.jobId.description.length > 100 && (
          <button
            onClick={toggleExpanded}
            className="text-green-primary hover:text-green-secondary underline mt-1 cursor-pointer"
          >
            {isExpanded ? 'less' : 'more'}
          </button>
        )}
      </div>
      <div className="flex flex-wrap mt-5">
        {proposal.jobId.skills.map((skill:any, index:any) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-600 rounded-full px-3 py-1 mr-2 mb-2"
          >
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>

    </>
  );
};

export default ProposalCard;
