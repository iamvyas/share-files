import express from "express"

import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//data needed to process info
let testVar = "hello12" //so we got to keep ds as let because const doesnt let us change


let sample = [
  {
    room: 2652,
    key: 6356,
    messages: [
    ]
  }
];

const app = express();
app.use(cors());  // to test in local
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setting pathname 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const { text, room } = req.body;

  // Block empty messages (no file, no text)
  if (!text && !req.file) {
    return res.status(400).json({ error: 'Empty message' });
  }

  const savedFileName = req.file ? req.file.filename : null;

  const roomData = sample.find(r => r.room == room);
  if (!roomData) {
    return res.status(404).json({ error: 'Room not found' });
  }

  // ✅ Store message with null file if none provided
  roomData.messages.push({
    text: text || '',
    file: savedFileName
  });

  res.json(roomData);
});

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).json({ error: "File not found or download failed" });
    }
  });
});


function generateUniqueRoomNumber() {
  let room;
  do {
    room = Math.floor(1000 + Math.random() * 9000); // 4-digit
  } while (sample.some(r => r.room === room));
  return room;
}

function generateKey() {
  return Math.floor(1000 + Math.random() * 9000); // 4-digit
}

app.post('/create', (req, res) => {
  const newRoom = generateUniqueRoomNumber();
  const newKey = generateKey();

  const newEntry = {
    room: newRoom,
    key: newKey,
    messages: []
  };

  sample.push(newEntry);

  // Respond with the new room & key so frontend can use it
  res.json({ room: newRoom, key: newKey });
});

app.post('/join', (req, res) => {
  const { room, key } = req.body;
  console.log("inside join")
  const foundRoom = sample.find(entry => entry.room == room && entry.key == key);

  if (foundRoom) {
    return res.json(foundRoom);
  } else {
    return res.status(401).json({ error: 'Invalid room or key' });
  }
});

app.get("/",(req,res)=>{
    testVar = "var changed"
    res.send("Hello World")
})



app.get("/msg/:room", (req, res) => {
  const { room } = req.params;
  console.log("room has been created")
  console.log("GET /msg invoked for room:", room);

  const roomData = sample.find(entry => entry.room == room);

  if (roomData) {
    res.json(roomData);
  } else {
    res.status(404).json({ error: "Room not found" });
  }
});


app.get("/get",(req,res)=>{
  console.log("get invoked");
  sample.forEach(roomObj => {
  console.log("Room:", roomObj.room);
  roomObj.messages.forEach(msg => {
    console.log("Text:", msg.text, "| Image:", msg.image);
  });
});
  
  res.send("var:"+ testVar)
})

app.get("/add",(req,res)=>{
  sample[0].messages.push({ text: "new message", image: "img.jpg" });
  
  res.send("var:"+ testVar)
})

app.listen(8000,'0.0.0.0',()=>{
    console.log("server running");
})


/*
Multer is an npm package commonly used in Node.js applications for handling multipart/form data,
particularly for file uploads. It simplifies the process of handling file uploads by providing middleware
that can be easily integrated into Express.js applications.

multer doesnt care if file field is empty it just skips the process

features:
File Uploads: Allows uploading files from client-side forms to the server.
Middleware: Integrates seamlessly with Express.js middleware, making it easy to handle file uploads within routes.
File Storage: Provides options for storing uploaded files on the server, such as in-memory storage, disk storage, or using a custom storage engine.
File Filtering: Supports filtering uploaded files based on file type, size, and other criteria.
Error Handling: Offers error handling for file uploads, including handling file size limits, invalid file types, and other upload-related errors.
*/