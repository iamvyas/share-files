import '../App.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const chatBox = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [response, setResponse] = useState(null);



  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
  console.log("Updated response:", response);
  }, [response]);


  useEffect(() => {
  const fetchChatRoom = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/msg`);
      setResponse(res.data);
    } catch (err) {
      console.error("Error fetching chat room:", err);
    }
  };

  fetchChatRoom();
}, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text',text);

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
      console.log(res.data);
    } catch (err) {
      console.error('Upload Error:', err);
    }
  }

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
            {/* Add delete button logic sometime later lol */}
          </div>
        ))}
      </>
    ) : (
      <p className="p-4 text-center">Loading chat...</p>
    )}

    
    <div class="fixed bottom-0 left-0 w-full bg-orange-400 p-4 flex items-center gap-2 shadow-md">
    <label class="cursor-pointer bg-white text-orange-500 px-3 py-2 rounded-lg font-medium">
        📎
    <input type="file" onChange={handleChange} class="hidden" />
    </label>

    <input
    type="text" onChange={(e) => setText(e.target.value)}
    placeholder="Type your message..."
    class="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"/>
    <button class="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-900 transition" onClick={handleUpload}>
    Send
    </button>
    </div>

    </>

    
  );
}

export default chatBox;