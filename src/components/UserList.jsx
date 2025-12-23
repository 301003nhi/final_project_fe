import { useEffect, useState } from 'react';

export default function UserList({ onSelect }) {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/user/list', {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) return [];
        return res.json();
      })
      .then(setUsers)
      .catch(() => setErr('Cannot load users'));
  }, []);

  return (
    <div>
      <h4>Users</h4>
      {err && <div>{err}</div>}
      {users.map(u => (
        <div
          key={u._id}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelect?.(u)}
        >
          {u.first_name} {u.last_name}
        </div>
      ))}
    </div>
  );
}
