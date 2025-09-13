# AI-Powered Meeting Minutes Extractor
This project extracts key information from meeting notes, including summaries, decisions, and action items. It can process meeting notes provided as plain text or uploaded as `.txt` files. This is a simplified version of what could be built using AI APIs but uses basic text processing due to the limitations in accessing paid AI APIs.



## Table of Contents
1.  [Features](#features)
2.  [Sample Input Format](#sample-input-format)
3.  [Sample API Request (Raw Text via Postman)](#sample-api-request-raw-text-via-postman)
4.  [Sample JSON Output](#sample-json-output)
5.  [Folder Structure](#folder-structure)
6.  [Future Enhancements](#future-enhancements)
7.  [How to Test](#how-to-test)



## Features
*   Accepts meeting notes as plain text via POST requests or uploaded `.txt` files.
*   Parses key elements:
*   Summary of the meeting
*   Decisions made during the meeting
*   Action items, including who is responsible and when they are due
*   Outputs the extracted information in a structured JSON format.
*   Can be tested using Postman or a web browser.





## Sample Input Format
Here are a couple of examples of the meeting note format the extractor is designed to work with:

```
1:
Team Sync – May 26
We’ll launch the new product on June 10.
Ravi to prepare onboarding docs by June 5.
Priya will follow up with logistics team on packaging delay.
Beta users requested a mobile-first dashboard.
```

```
2:
Project Update – May 30
The client approved the final design on May 29.
Navleen will finalize the API documentation by June 2.
Testing phase to start from June 7.
Marketing team to prepare launch campaign materials.
```



## Sample API Request (Raw Text via Postman)
To test the API with raw text, you can use Postman with the following settings:

*   **Method:** `POST`
*   **URL:** `http://localhost:3000/process-meeting`
*   **Body:**
*   Select `Body` -> `raw` -> `Text`
*   Paste a sample text from the [Sample Input Format](#sample-input-format) section.



## Sample JSON Output
The API will return a JSON response with the extracted information. Here's an example:

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
```



## Folder Structure
The project's folder structure is organized as follows:

```
meeting-minutes-extractor/
uploads/              # contains uploaded .txt files
meeting1.txt
meeting2.txt
server.js             # main backend logic
package.json
README.md             # this file
```



## Future Enhancements
This project can be significantly enhanced by integrating real AI APIs such as OpenAI or Google Gemini, once an API key is available.



## How to Test
To run the project and test the API, follow these steps:

1.  Install the dependencies: `npm install`
2.  Start the server: `node server.js`
3.  The server will start at: `http://localhost:3000/process-meeting`

To test the API:

*   Use Postman to send a raw text POST request to the URL above.
*   Alternatively, you can test file uploads by manually reading `.txt` files in the backend code.
