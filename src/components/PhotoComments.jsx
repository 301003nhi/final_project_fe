import { useState } from 'react';

export default function PhotoComments({ photo }) {
  const [text, setText] = useState('');
  const [comments, setComments] = useState(photo.comments);

  async function add() {
    const res = await fetch(
      `http://localhost:3001/commentsOfPhoto/${photo._id}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: text })
      }
    );
    const p = await res.json();
    setComments(p.comments);
    setText('');
  }

  return (
    <div>
      {comments.map((c, i) => <div key={i}>{c.comment}</div>)}
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={add}>Comment</button>
    </div>
  );
}
