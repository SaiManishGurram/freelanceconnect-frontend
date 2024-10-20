import ProtectedRoute from '../../components/ProtectedRoute';

const FreelancerDashboard = () => {
    return (
      <ProtectedRoute>
      <div>
        <h1>Freelancer Dashboard</h1>
        <p>Welcome to the Freelancer Dashboard</p>
        {/* Add freelancer-specific content here */}
      </div>
      </ProtectedRoute>
    );
  };
  
  export default FreelancerDashboard;
  