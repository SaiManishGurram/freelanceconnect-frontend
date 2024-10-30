// src/components/jobs/JobPostForm.tsx
import React, { useState, useEffect } from 'react';
import { freelancerSubmitProposal } from '../../../services/apiService';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
import { toast } from 'react-hot-toast';

interface JobProposal {
  _id: string;
  jobId: string
  coverLetter: string;
  createdAt: string;
}

interface JobProposalFormProps {
  onClose: () => void;
  jobId: string
}

const JobProposalForm: React.FC<JobProposalFormProps> = ({ onClose, jobId }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const { loading, setLoading } = useLoading();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobProposalData = { coverLetter, jobId };
      let newJob;
      newJob = await freelancerSubmitProposal(jobProposalData);
      toast.success('Proposal Submitted successfully!');
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {loading && <Spinner />}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Cover Letter"
            className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            rows={5}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:text-right sm: text-center">
          <button
            type="submit"
            className=" w-full md:w-auto px-6 py-2 bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
          >
            Submit
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
};

export default JobProposalForm;
