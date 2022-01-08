
//const functions = require("firebase-functions"); // The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
//const admin = require("firebase-admin");
//admin.initializeApp();
//const fetch = require('node-fetch'); // The Firebase Admin SDK to access Firestore.
//const http = require ("http");

const express = require("express"); // webserver
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3000;


app.use(bodyParser.json());


app.listen(port, function() {
console.log(`Express server is running on port ${port}`); 

//  get Access to the Hello Flow data 

app.get("/", async (req, res) => {
  try {
    const response = await axios('https://api.helloflow.io/api/export/oauth/accessToken', {

      method: 'POST',

      params: {

        "clientId": "29262779749889236477958861",

        "clientSecret": "SXrTcl>LuZFBfM-tjTCLccuffEVdCUuc"

      }

    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 



/* this will not work (requires a file key -> check docs how to fetch files or feel free to reach)
app.get("/query", async (req, res) => {
  try {
    const response = await axios('https://api.helloflow.io/api/export/v1/query/file', {

      method: 'GET',

      params: {

        "key": "string",

      },

    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
*/


//
app.get("/:flowId", async (req, res) => {
  const flowId = req.params.flowId;
  try {
    const response = await axios('https://api.helloflow.io/api/export/v1/query/clients/' + flowId, {

      method: 'GET',

      headers: {

        'Content-Type': 'application/json',
        // i've got this from the first request
        'Authorization': 'Bearer "eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiNmJmZmViMmEtNDY0Zi00MDk3LWI4NGYtNGZhYjc1NDE0OWUwIiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjZhYTUyZDg0LTg4ZmEtNDQ2NC04MzBkLTc4MTkyZmMyZjA2NyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQxNTU0NjUzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiIyOTI2Mjc3OTc0OTg4OTIzNjQ3Nzk1ODg2MSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MTU1ODI1MywiaWF0IjoxNjQxNTU0NjUzfQ.NYbPI9_vFwVWQH_lNyoilIuJItcAlF8_ZNdmLG6NK9tBUo4Nym96J26BGyeOy-gFa6S1iPgQv2q9Gog3bXRs1ILXzOzu3aSreb_e8c2aQ3BZj1ykz45ZDzFak4dD1h8QBTYI65G86TojM83G92ltm9ticeTSTliaw7RU82TxSuDRQVTzuWEVqZvPcHamAWN-J7v5aZPx9FL1I3y5w0BDVfq7gwx5DbAHX1RPyV9xetcofkEOJPMlCjQv7khUZk1wGCHwAq0rKj_bRyqqGjUYaASD233SIZ-kqAQS-e27SA3VoOy4iSRfKRkhsAeziWNE01zRnjN-gjaF8Yzf5w-4ig',
      },

    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 

}); 