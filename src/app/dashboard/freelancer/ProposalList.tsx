'use client';

import React, { useState, useEffect } from 'react';
import ProposalCard from './ProposalCard';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
import { getFreelancerProposals, deleteFreelancerProposal } from '../../../services/apiService';
import { toast } from 'react-hot-toast';

interface Job {
  _id: string;
  title: string;
  description: string;
  skills: [];
  salary: number;
  createdAt: string;
}

const ProposalList: React.FC = () => {
  const [proposals, setProposals] = useState<Job[]>([]);
  const { loading } = useLoading();
  const { setLoading } = useLoading();

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const jobData = await getFreelancerProposals();
      setProposals(jobData);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const delteProposal = async (proposalId: string) => {
    setLoading(true);
    try {
      const proposalData = await deleteFreelancerProposal(proposalId);
      setProposals((prevProposals) => prevProposals.filter((proposal) => proposal._id !== proposalId));
      toast.success('Proposal declined successfully!');

    } catch (error) {
      console.error('Error deleting proposals:', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="md:justify-between md:items-center">
      <div className="text-xl md:text-4xl font-semibold mb-4">My Proposals </div>

      <div>
        {loading && <Spinner />}
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <ProposalCard key={proposal._id} proposal={proposal} delteProposal={delteProposal} />
          ))
        ) : (
          <p>No proposals found.</p>
        )}
      </div>

    </div>



  );
};

export default ProposalList;
