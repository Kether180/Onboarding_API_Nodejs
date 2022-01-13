
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

        "clientId": "63894863750735455373699675",

        "clientSecret": "1WPWrl21##tz#~g86SgWhL!gDnkK6Fi6"

      }

    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 


// Query : Retrieve profiles users submissions, it contains the whole data submitted by a user.
// The parameters before and after can be passed to define a time range for your search.

app.get("/profilesId", async (req, res) => {
  const profilesId = req.params.profilesId;
  try {
    const response = await axios('https://api.helloflow.io/api/export/v1/query/clients/61a8c241549eec02838a4485', {

      method: 'GET',

      headers: {

        'Content-type': 'application/json',

        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjJkYmIyOTc3LWJmM2EtNGZmMC1iYmI1LTMyYTkxZjk0ZWQ3ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyMTA5NTYxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjExMzE2MSwiaWF0IjoxNjQyMTA5NTYxfQ.eSXNAl-q_0uPviBgVf0e9-K_CEKQjMg9kd2qV8iZ_rKk3fgZu0YMx2JL0WzYoemprLbA33pK_bYlHsTfhB2oW7Bcs41F0Xv_4HZiti7H4P9IAJCBE1nE717zWA2MQzR-Jq_4IVyMOomi3tjBy1Te-XrldL2D-KuRmwDJfGO0AsRq4zx82obtJkCIt6i3ZJb_HGbPRC5KXHm50_2NkWulD92zxqgiGenbg97IpFZXWxeCRPE6C3J3PfYj3ajJs-kiC5Du3-QfeXUCFZKMXrgPPvZaF9KJ3yvA5x7CpxmeUZJmED4TBygjX2ftOeFNadsRTO5VtZa3SKtfkmPHny_BMg',
          /// token changes every 15 min, get new one and add it here.
      },

      

    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 

// QUERY: Retrieve profile data from any flows, am user cam submit data through multiple flows, which is aggregated here. Need to get id from the last function response localhost:3000/profilesId , search id
// in order to work.

app.get("/client", async (req, res) => {
  const client = req.params.client;
  try {
    const response = await axios('https://api.helloflow.io/api/export/v1/query/client/61af7762fa93aa72ab970862', { // type id from response here... 61af2729fa93aa72ab9640e4 clientid


      method: 'GET',

      headers: {

        'Content-Type': 'application/json',
        // i've got this from the first request
        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjJkYmIyOTc3LWJmM2EtNGZmMC1iYmI1LTMyYTkxZjk0ZWQ3ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyMTA5NTYxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjExMzE2MSwiaWF0IjoxNjQyMTA5NTYxfQ.eSXNAl-q_0uPviBgVf0e9-K_CEKQjMg9kd2qV8iZ_rKk3fgZu0YMx2JL0WzYoemprLbA33pK_bYlHsTfhB2oW7Bcs41F0Xv_4HZiti7H4P9IAJCBE1nE717zWA2MQzR-Jq_4IVyMOomi3tjBy1Te-XrldL2D-KuRmwDJfGO0AsRq4zx82obtJkCIt6i3ZJb_HGbPRC5KXHm50_2NkWulD92zxqgiGenbg97IpFZXWxeCRPE6C3J3PfYj3ajJs-kiC5Du3-QfeXUCFZKMXrgPPvZaF9KJ3yvA5x7CpxmeUZJmED4TBygjX2ftOeFNadsRTO5VtZa3SKtfkmPHny_BMg',
      },

    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 

// Query: Retrieve profile data from flow, retrieve user submissions from just one flow , NEED TO CHECK ! 

app.get("/flow", async (req, res) => {
  const flow = req.params.flow;
  try {
    const response = await axios('https://api.helloflow.io/api/export/v1/query/client/flow/61af2729fa93aa72ab9640e4/61af7762fa93aa72ab970862', { // clientid + flowid

      method: 'GET',

      headers: {

        'Content-Type': 'application/json',
        // i've got this from the first request
        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjJkYmIyOTc3LWJmM2EtNGZmMC1iYmI1LTMyYTkxZjk0ZWQ3ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyMTA5NTYxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjExMzE2MSwiaWF0IjoxNjQyMTA5NTYxfQ.eSXNAl-q_0uPviBgVf0e9-K_CEKQjMg9kd2qV8iZ_rKk3fgZu0YMx2JL0WzYoemprLbA33pK_bYlHsTfhB2oW7Bcs41F0Xv_4HZiti7H4P9IAJCBE1nE717zWA2MQzR-Jq_4IVyMOomi3tjBy1Te-XrldL2D-KuRmwDJfGO0AsRq4zx82obtJkCIt6i3ZJb_HGbPRC5KXHm50_2NkWulD92zxqgiGenbg97IpFZXWxeCRPE6C3J3PfYj3ajJs-kiC5Du3-QfeXUCFZKMXrgPPvZaF9KJ3yvA5x7CpxmeUZJmED4TBygjX2ftOeFNadsRTO5VtZa3SKtfkmPHny_BMg',
      },

    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 

// this is for files , filedata from our Hello Flow builder but  at the moment we don't have any files  but will work if we do. you get the key from response data , if you have a file > keyvalue.

app.get("/query", async (req, res) => {
  try {
    const response = await axios('https://api.helloflow.io/api/export/v1/query/file', {
      method: 'GET',
      params: {
        "key": "string",  // key value goes here.
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


app.get("/subscribe", async (req, res) => {
  try {
    const response = await axios('https://api.helloflow.io/api/export/subscribe/', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json',

        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjUwYjZmZWE5LWY0NjUtNDNhOS05ZTcxLWUzNzcyMzIxNDU4ZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyMDg0NzM0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjA4ODMzNCwiaWF0IjoxNjQyMDg0NzM0fQ.QJEbEQuoqHsCQidIufYiAJvufKh5v26NV2JI-v_pj3sSu5xq7Utnzs0tMTzhFL1MeRAIv6ZMATpbCLKjaDPajJ0hswgHo6uOlZev4hK5Hm9m6urfirU3izT3dzql1mtGRMw0lBnXYF1qB4_vwdGoMVFsJTHQ_yeHrnhWnOGEuA98tz7rgOB2VAHYM69a2NmB50UmDy5MSDkHK7yys_KT3qrNz7nJuvgCWR2K0lPH5P9jf6r9vkvb5vUegf3PJHjKySTjnD2CB4xUoBuRODG73FHU5Npa0d2eaThhKMyka0__hMUQj-ZMLnYx-K5qR6HGcyksA2bhz0kC2dJvhvWGew',

      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

}); 


/* const fs = require('fs');

let pasingJSON

fs.readFile('./exportApi.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log('File read failed:', err);
    return;
  }

  try {
    const exportApi = JSON.parse(jsonString);
    console.log('Postman Hello Flow data:', loading);
  } catch (err) {
  console.log('Error parsing JSON:', err);

  }
}); */ 