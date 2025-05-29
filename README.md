# AI-Powered Meeting Minutes Extractor

This project extracts summaries, decisions, and action items from meeting text files or raw input. Built using **Node.js** and **Express**, it's a mock version created due to limitations in accessing paid AI APIs.



# Features

Accepts **plain text meeting notes** via POST request or uploaded `.txt` files.
Parses:
  - Summary
  - Decisions made
  - Action items with assignees and due dates
- Outputs results in **structured JSON format**
- Supports Postman or browser testing



# Why No API Key?

I planned to use OpenAI/Gemini/Claude APIs for natural language processing.  
However, these APIs require **paid keys**, which were not available during this project.

So, I created a **mock version** by manually writing logic to extract data from a specific meeting format with bullet points using the help of ai.

---

# Sample Input Format
1: 
Team Sync – May 26
We’ll launch the new product on June 10.
Ravi to prepare onboarding docs by June 5.
Priya will follow up with logistics team on packaging delay.
Beta users requested a mobile-first dashboard.

2:
Project Update – May 30
The client approved the final design on May 29.
Navleen will finalize the API documentation by June 2.
Testing phase to start from June 7.
Marketing team to prepare launch campaign materials.



# Sample API Request (Raw Text via Postman)

**POST** `http://localhost:3000/process-meeting`

- Select Body → raw → Text
- Paste any sample text from the input



# Sample JSON Output

```json
{
  "summary": "The team confirmed the product launch on June 10, assigned onboarding preparation and logistics follow-up, and discussed user feedback on mobile design.",
  "decisions": [
    "Launch set for June 10",
    "Need mobile-first dashboard for beta users"
  ],
  "actionItems": [
    {
      "task": "Prepare onboarding docs",
      "owner": "Ravi",
      "due": "June 5"
    },
    {
      "task": "Follow up with logistics team",
      "owner": "Priya"
    }
  ]
}


Folder Structure

meeting-minutes-extractor/
uploads/              # contains uploaded .txt files
meeting1.txt
meeting2.txt

server.js             # main backend logic

package.json
README.md             # this file



We can later enhance this using real AI APIs like OpenAI or Google Gemini once you have a key.



How to Test

npm install
node server.js
Start server: http://localhost:3000/process-meeting

Use Postman to send a raw text POST request to:
Or test file uploads by reading .txt files manually in the backend.

