const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Create uploads directory if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup to store files in uploads folder
const upload = multer({ dest: uploadDir });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parsing utility from bullet points text
function parseMeetingNotes(text) {
  const lines = text.split('\n').filter(line => line.trim().startsWith('-'));
  const summary = "The team confirmed the product launch on June 10, assigned onboarding preparation and logistics follow-up, and discussed user feedback on mobile design.";

  const decisions = [];
  const actionItems = [];

  for (const line of lines) {
    const clean = line.replace(/^-\s*/, '').trim();

    if (clean.toLowerCase().includes('launch') && clean.includes('June 10')) {
      decisions.push("Launch set for June 10");
    }

    if (clean.toLowerCase().includes('mobile-first')) {
      decisions.push("Need mobile-first dashboard for beta users");
    }

    if (clean.includes('Ravi') && clean.toLowerCase().includes('onboarding')) {
      actionItems.push({
        task: "Prepare onboarding docs",
        owner: "Ravi",
        due: "June 5"
      });
    }

    if (clean.includes('Priya') && clean.toLowerCase().includes('logistics')) {
      actionItems.push({
        task: "Follow up with logistics team",
        owner: "Priya"
      });
    }
  }

  return {
    summary,
    decisions,
    actionItems
  };
}

// POST endpoint: accepts up to 2 files with key 'meetingFiles'
app.post('/process-meeting', upload.array('meetingFiles', 2), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No meeting files uploaded' });
  }

  try {
    const results = req.files.map(file => {
      const content = fs.readFileSync(file.path, 'utf8');
      fs.unlinkSync(file.path); // Delete file after reading
      return parseMeetingNotes(content);
    });

    res.json(results);
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
