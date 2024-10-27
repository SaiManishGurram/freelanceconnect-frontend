// src/components/jobs/JobPostForm.tsx
import React, { useState, useEffect } from 'react';
import { createJob, updateJob } from '../../../services/apiService';
import { useLoading } from '../../../context/LoadingContext';
import Spinner from '../../components/Spinner';
import { toast } from 'react-hot-toast';

interface Job {
  _id: string;
  title: string;
  description: string;
  skills: [];
  salary: number;
  createdAt: string;
}

interface JobPostFormProps {
  onClose: () => void;
  onJobPosted: (newJob: Job) => void
  onJobEditData?: Job
  onJobEdited: ( _id:string, newJob: Job) => void
}

const JobPostForm: React.FC<JobPostFormProps> = ({ onClose, onJobPosted, onJobEditData, onJobEdited }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [salary, setSalary] = useState<number | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [error, setError] = useState('');
  const { loading, setLoading } = useLoading();

  // Set initial values if editing a job
  useEffect(() => {
    if (onJobEditData) {
      setTitle(onJobEditData.title);
      setDescription(onJobEditData.description);
      setSalary(onJobEditData.salary);
      setSkills(onJobEditData.skills);
    }
  }, [onJobEditData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobData = { title, description, salary, skills };
      let newJob;

      if (onJobEditData) {
        newJob = await updateJob(onJobEditData._id, jobData);
        onJobEdited(onJobEditData._id,newJob);
      } else {
        newJob = await createJob(jobData);
        onJobPosted(newJob);
      }

      toast.success(onJobEditData ? 'Job updated successfully!' : 'Job posted successfully!');
      setTitle('');
      setDescription('');
      setSkills([]);
      setSkillInput('');
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div className="relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>

        {/* Job Description */}
        <div className="relative">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            rows={5}
            required
          />
        </div>

        {/* Salary */}
        <div className="relative">
          <input
            type="number"
            id="salary"
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            placeholder="Budget"
            className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>

        {/* Skills */}
        <div className="relative">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillInputKeyDown}
            placeholder="Add a skill and press Enter"
            className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
          <div className="flex flex-wrap mt-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center border-2 border-green-secondary rounded-full px-3 py-1 mr-2 mb-2"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-green-primary"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:text-right sm: text-center">
          <button
            type="submit"
            className=" w-full md:w-auto px-6 py-2 bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
          >
            Post Job
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
};

export default JobPostForm;
