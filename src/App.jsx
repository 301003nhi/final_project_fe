// import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthProvider, useAuth } from './context/authContext';
import LoginRegister from './components/LoginRegister';
import TopBar from './components/TopBar';
import UserList from './components/UserList';
import UserPhotos from './components/UserPhotos';

function Main() {
  const { user } = useAuth();

  if (!user) return <LoginRegister />;

  return (
    <>
      <TopBar />
      <UserList />
      <UserPhotos />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
