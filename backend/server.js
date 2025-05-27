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
      { text: "blah", image: "null" },
      { text: "blah", image: "null" }
    ]
  }
];

const app = express();
app.use(cors());  // to test in local


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
  res.json({ message: 'Upload success', file: req.file });
});



app.get("/",(req,res)=>{
    testVar = "var changed"
    res.send("Hello World")
})


app.get("/get",(req,res)=>{

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

app.listen(8000,()=>{
    console.log("server running");
})


/*
Multer is an npm package commonly used in Node.js applications for handling multipart/form data,
particularly for file uploads. It simplifies the process of handling file uploads by providing middleware
that can be easily integrated into Express.js applications.

features:
File Uploads: Allows uploading files from client-side forms to the server.
Middleware: Integrates seamlessly with Express.js middleware, making it easy to handle file uploads within routes.
File Storage: Provides options for storing uploaded files on the server, such as in-memory storage, disk storage, or using a custom storage engine.
File Filtering: Supports filtering uploaded files based on file type, size, and other criteria.
Error Handling: Offers error handling for file uploads, including handling file size limits, invalid file types, and other upload-related errors.
*/