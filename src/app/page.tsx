import SignUp from './components/SignUp';
import Login from './components/Login';
import Chat from './components/Chat';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: 'white' }}>  {/* Changed background to white */}
      <h1>Welcome to FreelanceConnect</h1>
      <SignUp />

      <Login />
      
      <Chat />
    </div>
  );
}
