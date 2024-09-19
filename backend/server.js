const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Prediction endpoint
app.post('/predict', upload.single('file'), (req, res) => {
  const { details } = req.body;

  // Check if the file was uploaded successfully
  if (!req.file) {
    console.error('No file uploaded.');
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'temp', req.file.filename);
  console.log(`Received file: ${filePath}`);

  // Call the Python script for prediction
  exec(`python your_model_script.py ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error in prediction');
    }

    // Parse the output from the Python script
    try {
      const output = JSON.parse(stdout);
      res.json({ ...output, details });
    } catch (parseError) {
      console.error(`Error parsing output: ${parseError}`);
      console.error(`stdout: ${stdout}`);
      return res.status(500).send('Error parsing output');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
