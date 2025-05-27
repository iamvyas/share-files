import '../App.css'
import React, { useState } from 'react';
import axios from 'axios';


const chatBox = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

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
      console.log(res.data);
    } catch (err) {
      console.error('Upload Error:', err);
    }
  }

  return (
    <>
    
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