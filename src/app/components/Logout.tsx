// src/app/components/Logout.tsx
import { auth } from '../../services/firebase'; // Adjust the path if needed
import { signOut } from 'firebase/auth';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // User logged out successfully, handle post-logout logic (e.g., redirect, show message)
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
