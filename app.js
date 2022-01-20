const express = require("express"); // webserver
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3000;
const fetch = require("fetch");



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

        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjFhNGNiZmFmLTQ2OGItNDVhMS04ODE4LWRiNDkxZDJmNWUyNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyNTE2NjE4LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjUyMDIxOCwiaWF0IjoxNjQyNTE2NjE4fQ.zwvldn0WaQ8W8gfnWrCoKRyzFxqd3_vWZsLFfMJrUsGY0mlfo_irsMYZjKyGSg39GdlmmmJJVwPUi45OtVVXdGok6YEBIbFwfNturk5iVzMOXh7xzogoSQybfeV46-Ll1jEIysYkHKViKLBYGcNZv1XZu4OTMfN3lILRVDrRVLVk02uC1RPZRXU5lrnoQ6rpscLlYGjKRG0Maw5BRajNhO0Gz9WfFfZmUfr6nkPwKjH8Msi1XTYFySc4aood5RXNU2LSh8Nbr3F166ZV82HwjsCjFLy1Y1Izfe5DO56VRxrVOTZZG-EVr6qcRIFAmPplzwQvSbzXJH2n9zvePu0OUA',
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
    const response = await axios('https://api.helloflow.io/api/export/v1/query/client/61af800cfa93aa72ab9861de', { // type id from response here... 61af2729fa93aa72ab9640e4 clientid


      method: 'GET',

      headers: {

        'Content-Type': 'application/json',
       
        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjFhNGNiZmFmLTQ2OGItNDVhMS04ODE4LWRiNDkxZDJmNWUyNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyNTE2NjE4LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjUyMDIxOCwiaWF0IjoxNjQyNTE2NjE4fQ.zwvldn0WaQ8W8gfnWrCoKRyzFxqd3_vWZsLFfMJrUsGY0mlfo_irsMYZjKyGSg39GdlmmmJJVwPUi45OtVVXdGok6YEBIbFwfNturk5iVzMOXh7xzogoSQybfeV46-Ll1jEIysYkHKViKLBYGcNZv1XZu4OTMfN3lILRVDrRVLVk02uC1RPZRXU5lrnoQ6rpscLlYGjKRG0Maw5BRajNhO0Gz9WfFfZmUfr6nkPwKjH8Msi1XTYFySc4aood5RXNU2LSh8Nbr3F166ZV82HwjsCjFLy1Y1Izfe5DO56VRxrVOTZZG-EVr6qcRIFAmPplzwQvSbzXJH2n9zvePu0OUA',
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
    const response = await axios('https://api.helloflow.io/api/export/v1/query/client/flow/61af800cfa93aa72ab9861de/61a8c241549eec02838a4485', { // clientid + flowid

      method: 'GET',

      headers: {

        'Content-Type': 'application/json',
     
        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjFhNGNiZmFmLTQ2OGItNDVhMS04ODE4LWRiNDkxZDJmNWUyNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyNTE2NjE4LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjUyMDIxOCwiaWF0IjoxNjQyNTE2NjE4fQ.zwvldn0WaQ8W8gfnWrCoKRyzFxqd3_vWZsLFfMJrUsGY0mlfo_irsMYZjKyGSg39GdlmmmJJVwPUi45OtVVXdGok6YEBIbFwfNturk5iVzMOXh7xzogoSQybfeV46-Ll1jEIysYkHKViKLBYGcNZv1XZu4OTMfN3lILRVDrRVLVk02uC1RPZRXU5lrnoQ6rpscLlYGjKRG0Maw5BRajNhO0Gz9WfFfZmUfr6nkPwKjH8Msi1XTYFySc4aood5RXNU2LSh8Nbr3F166ZV82HwjsCjFLy1Y1Izfe5DO56VRxrVOTZZG-EVr6qcRIFAmPplzwQvSbzXJH2n9zvePu0OUA',
      },

    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 

// this is for files , filedata from our Hello Flow builder. you get the key from response data , if you have a file > keyvalue.  application/octet-stream -

app.get("/file", async (req, res) => {
  const file = req.params.file;
  try {
    const response = await fetch('https://api.helloflow.io/api/export/v1/query/file', {
      method: 'GET',

      headers: {

        'Content-Type': 'application/octet-stream'
      },
      params: {
        "key": "string",  // key value goes here.
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// subscribe events.

app.post("/subscribe", function (req, res) {

	console.log(req.body);
	res.setHeader('Content-Type', 'application/octet-stream');

	res.end(
    JSON.stringify({
		"challenge": req.body.challenge
	}));
 })

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

console.log('Navigate to http://localhost:4000/subscribe.');

}); 


/*

app.post("/subscribe", async (req, res) => {
  try {
    const response = await axios('https://api.helloflow.io/api/export/subscribe/', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json',

        'Authorization': 'eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6ImI1OGU0NDlhLWU2N2MtNDcwNS04MjI1LWFhM2RhMjYwYjU0MSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyMTUzNzk2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0MjE1NzM5NiwiaWF0IjoxNjQyMTUzNzk2fQ.2JK5HFXKgMw3Edpu55Ge8UK0yU9tZtI8swUM2-Cgq8w3FE0k04QKApG7dcwuaPn3xdooJINqVIytrPerVrAUtbkpyD-NWGCEvhkqAXduYsh6oTtlG-fZlS9sD4xICCyMoVHQGZCvKfIHzlVfoBopnDMStFDhStOglj4pa1j1zwFaXnL8lzrgL5YbhBz3L9svT0cYHEmABwUiy3kXmo4_8b6xuwlpuIfrsS-amFSbx86YN4AA2Jsyfe9gP_oxbzdl70vSXCEtosG4JI-YueYi9yE7ddsowojIKOCX2uj5SfDJ9fddHsnjrA0GWjAzPL3YB5nPmS-FajipzXjFAPoZEg',

      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

}); 



 const fs = require('fs');

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
}); 
    */
