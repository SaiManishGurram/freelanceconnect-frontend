import SignUp from './components/SignUp';
import Login from './components/Login';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: 'white' }}>  {/* Changed background to white */}
      <h1>Welcome to FreelanceConnect</h1>
      <SignUp />
      <Login />
    </div>
  );
}
