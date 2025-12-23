import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
import { useAuth } from '../context/authContext';
import PhotoComments from './PhotoComments';

export default function UserPhotos() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/photosOfUser/${user._id}`, {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(setPhotos);
  }, [user]);

  async function upload(e) {
    const fd = new FormData();
    fd.append('photo', e.target.files[0]);

    await fetch('http://localhost:3001/photos/new', {
      method: 'POST',
      credentials: 'include',
      body: fd
    });

    window.location.reload();
  }

  return (
    <div>
      <input type="file" onChange={upload} />
      {photos.map(p =>
        <div key={p._id}>
          <img src={`http://localhost:3001/images/${p.file_name}`} width="200"/>
          <PhotoComments photo={p}/>
        </div>
      )}
    </div>
  );
}
