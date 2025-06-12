import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChatBox = () => {
  const { room } = useParams(); // ✅ Gets room from URL like /room/1234
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/msg/${room}`); // ✅ uses dynamic room
        setResponse(res.data);
      } catch (err) {
        console.error("Error fetching chat room:", err);
      }
    };

    if (room) fetchChatRoom(); // Only fetch if room is defined
  }, [room]);

  const handleUpload = async () => {
    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('text', text);
    formData.append('room', room); // ✅ send room in POST

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data); // Refresh chat
      setText('');
      setFile(null);
    } catch (err) {
      console.error('Upload Error:', err);
    }
  };

  return (
    <>
      {response ? (
        <>
          <div className="bg-orange-200 p-4 rounded-md shadow text-center font-bold">
            Room ID: {response.room} | Key: {response.key}
          </div>

          {response.messages.map((msg, i) => (
            <div key={i} className="p-2 border-b border-gray-300">
              <p className="font-medium">#{i}</p>
              {msg.text && <p>📝 {msg.text}</p>}
              {msg.file && msg.file !== "null" && (
                <p>📎 <a href={`http://localhost:8000/download/${msg.file}`} download>{msg.file}</a></p>
              )}
            </div>
          ))}
        </>
      ) : (
        <p className="p-4 text-center">Loading chat...</p>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-orange-400 p-4 flex items-center gap-2 shadow-md">
        <label className="cursor-pointer bg-white text-orange-500 px-3 py-2 rounded-lg font-medium">
          📎
          <input type="file" onChange={handleChange} className="hidden" />
        </label>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
        />

        <button
          className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-900 transition"
          onClick={handleUpload}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatBox;
