import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Navbar = () => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinRoom, setJoinRoom] = useState('');
  const [joinKey, setJoinKey] = useState('');
  const navigate = useNavigate(); // React Router hook

  const toggleJoin = () => {
    setShowJoinForm(prev => !prev);
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        room: joinRoom,
        key: joinKey,
      };
      const res = await axios.post('http://localhost:8000/join', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Join Success:', res.data);
      navigate(`/room/${res.data.room}`); // Redirect on success
    } catch (err) {
      console.error('Join Error:', err);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post('http://localhost:8000/create');
      console.log('Room Created:', res.data);
      navigate(`/room/${res.data.room}`); // Redirect to new room
    } catch (err) {
      console.error('Create Error:', err);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-orange-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">Share Files</div>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <button className="hover:text-yellow-200" onClick={toggleJoin}>
                Join
              </button>
            </li>
            <li>
              <button className="hover:text-yellow-200" onClick={handleCreate}>
                Create
              </button>
            </li>
            <li><a href="#" className="hover:text-yellow-200">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Join Form */}
      {showJoinForm && (
        <div className="bg-orange-100 border-t border-orange-300 px-6 py-4 shadow-inner flex justify-center">
          <form className="flex space-x-4" onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Room (4 digits)"
              maxLength="4"
              pattern="\d{4}"
              value={joinRoom}
              onChange={(e) => setJoinRoom(e.target.value)}
              className="px-3 py-2 rounded border border-orange-300 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Key (4 digits)"
              maxLength="4"
              pattern="\d{4}"
              value={joinKey}
              onChange={(e) => setJoinKey(e.target.value)}
              className="px-3 py-2 rounded border border-orange-300 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Enter
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
