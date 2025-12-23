// import { useAuth } from '../context/AuthContext';
import { useAuth } from "../context/authContext";

export default function TopBar() {
  const { user, logout } = useAuth();

  return (
    <div>
      Hi {user.first_name}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
