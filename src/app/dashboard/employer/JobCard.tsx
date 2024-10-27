// src/components/jobs/JobCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { deleteJob } from '../../../services/apiService';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
import { toast } from 'react-hot-toast';
import useRelativeTime from '../../../hooks/useRelativeTime';
import {
  EllipsisHorizontalIcon
} from '@heroicons/react/24/solid';
import JobPostForm from './JobPostForm'; // Import JobPostForm

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    description: string;
    skills: [];
    salary: number;
    createdAt: string;
  };
  onJobDelete: (jobId: string) => void;
  onJobEdit: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onJobDelete, onJobEdit }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditJob = () => {
    onJobEdit(job._id)
    setIsEditing(true);
  };

  const handleDeleteJob = async () => {
    setLoading(true);
    try {
      await deleteJob(job);
      onJobDelete(job._id);
      toast.success('Job deleted successfully!');
    } catch (error) {
      console.error('Delete failed', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg p-4 mb-4 flex justify-between items-center">
      {loading && <Spinner />}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
        <p className="text-gray-600 mt-2">{job.description}</p>
        <p className="text-gray-600 mt-5">Budget: ₹{job.salary}</p>
        <p className="text-gray-600 mt-2">{useRelativeTime(job.createdAt)}</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-green-primary hover:bg-gray-100 focus:outline-none  transition-colors transition-transform duration-200 active:scale-95"
        >
          <EllipsisHorizontalIcon className="w-7 h-7 text-green-primary  transition-colors transition-transform duration-200 active:scale-95" />
        </button>
        <div
          className={`absolute right-0 mt-2 w-40 bg-white rounded-md shadow-2xl border border-gray-300 z-10 transform transition-all ease-in-out duration-300 ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
            }`}
        >
          <div className="absolute top-[-6px] right-4 w-3 h-3 bg-white rotate-45 shadow-lg border-l border-t border-gray-300 z-10" />
          <ul className="py-2">
            <li
              onClick={handleEditJob}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Edit posting
            </li>
            <li
              onClick={handleDeleteJob}
              className="block px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
            >
              Remove posting
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
