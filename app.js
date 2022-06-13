const express = require("express"); // webserver
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3000;
const fetch = require("fetch");



app.use(bodyParser.json());


app.listen(port, function() {
console.log(`Express server is running on port ${port}`); 




//  get Access to data 

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

        'Authorization': 'BearereyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjRmMmI3NDI1LTAxZmEtNDY3My1iZTIyLTFlYTdlMzI3MjA5YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyNzc0NzE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0Mjc3ODMxOSwiaWF0IjoxNjQyNzc0NzE5fQ.YiJ-LJb-_u2cryXk8YM2ABUayHYDo0SqUSxwealkvpVjbo0I76gLMgmz94D1i2d_Fj4hmtkl8xWxKfSEf0uLL39aGcJ_4l2FqrpS9_FqG6ZD2wuhlYXG4nSiMZuKmVzhbzQ0ailIDjLEgdEttpmgE3nkg0VQSlBrHMFyc8jTjTldFLPjALUtwnnZyxDYlFSv75UcJI_VZ3az9ft1sa0_pWKr5V3b91BzzU73YmZIm3-BwAFQPEzrihCFi8jXcD6xru_MWZwKGdcxo8ytbfC5Fl_21yqHIepQ-paYABe84dOH0xQgq6yJu3T5Up3uMgNZAb9N1m2N4fj1BaoEmNWSMw',
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
    const response = await axios('https://api.helloflow.io/api/export/v1/query/client/61d2f9db7c768b7263aeb378', { // type id from response here... 61af2729fa93aa72ab9640e4 clientid


      method: 'GET',

      headers: {

        'Content-Type': 'application/json',
       
        'Authorization': 'BearereyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjRmMmI3NDI1LTAxZmEtNDY3My1iZTIyLTFlYTdlMzI3MjA5YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyNzc0NzE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0Mjc3ODMxOSwiaWF0IjoxNjQyNzc0NzE5fQ.YiJ-LJb-_u2cryXk8YM2ABUayHYDo0SqUSxwealkvpVjbo0I76gLMgmz94D1i2d_Fj4hmtkl8xWxKfSEf0uLL39aGcJ_4l2FqrpS9_FqG6ZD2wuhlYXG4nSiMZuKmVzhbzQ0ailIDjLEgdEttpmgE3nkg0VQSlBrHMFyc8jTjTldFLPjALUtwnnZyxDYlFSv75UcJI_VZ3az9ft1sa0_pWKr5V3b91BzzU73YmZIm3-BwAFQPEzrihCFi8jXcD6xru_MWZwKGdcxo8ytbfC5Fl_21yqHIepQ-paYABe84dOH0xQgq6yJu3T5Up3uMgNZAb9N1m2N4fj1BaoEmNWSMw',
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
     
        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjRmMmI3NDI1LTAxZmEtNDY3My1iZTIyLTFlYTdlMzI3MjA5YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyNzc0NzE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0Mjc3ODMxOSwiaWF0IjoxNjQyNzc0NzE5fQ.YiJ-LJb-_u2cryXk8YM2ABUayHYDo0SqUSxwealkvpVjbo0I76gLMgmz94D1i2d_Fj4hmtkl8xWxKfSEf0uLL39aGcJ_4l2FqrpS9_FqG6ZD2wuhlYXG4nSiMZuKmVzhbzQ0ailIDjLEgdEttpmgE3nkg0VQSlBrHMFyc8jTjTldFLPjALUtwnnZyxDYlFSv75UcJI_VZ3az9ft1sa0_pWKr5V3b91BzzU73YmZIm3-BwAFQPEzrihCFi8jXcD6xru_MWZwKGdcxo8ytbfC5Fl_21yqHIepQ-paYABe84dOH0xQgq6yJu3T5Up3uMgNZAb9N1m2N4fj1BaoEmNWSMw',
      },

    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}); 

// this is for files , filedata from our Flow builder. you get the key  from response data , and it will be called fileData.  Take fileData from each client as key.

app.get("/file", async (req, res) => {
  const file = req.params.file;
  try {
    const response = await axios ('https://api.helloflow.io/api/export/v1/query/file', {  // check 
      method: 'GET',

      headers: {

        'Content-Type': 'application/octet-stream',
        'Authorization': 'Bearer eyJraWQiOiJHXC9NcHVuWlRNY2NxM1VIMDZWaDFUaEo2eUZuY2x6WU1Kc0o3MnNcL1R5clE9IiwiYWxnIjoiUlMyNTYifQ.eyJjdXN0b206b3JnYW5pemF0aW9uIjoiNDk5OTUxZDEtODdjNy00MjYxLWE4MGMtMzZhY2QyYmYzNzU2Iiwic3ViIjoiMGNmMTE0ODItOGEwMC00NGVmLWExNzctZjhhYzNmODE5MzE3IiwiYXVkIjoiMWdjZGwxaGN2a2R0YmJ2Mjk5cWZzM3FoajYiLCJldmVudF9pZCI6IjRmMmI3NDI1LTAxZmEtNDY3My1iZTIyLTFlYTdlMzI3MjA5YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQyNzc0NzE5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2ZBcmlYS3NIdiIsImNvZ25pdG86dXNlcm5hbWUiOiI2Mzg5NDg2Mzc1MDczNTQ1NTM3MzY5OTY3NSIsInByZWZlcnJlZF91c2VybmFtZSI6IjQ5OTk1MWQxLTg3YzctNDI2MS1hODBjLTM2YWNkMmJmMzc1NiIsImV4cCI6MTY0Mjc3ODMxOSwiaWF0IjoxNjQyNzc0NzE5fQ.YiJ-LJb-_u2cryXk8YM2ABUayHYDo0SqUSxwealkvpVjbo0I76gLMgmz94D1i2d_Fj4hmtkl8xWxKfSEf0uLL39aGcJ_4l2FqrpS9_FqG6ZD2wuhlYXG4nSiMZuKmVzhbzQ0ailIDjLEgdEttpmgE3nkg0VQSlBrHMFyc8jTjTldFLPjALUtwnnZyxDYlFSv75UcJI_VZ3az9ft1sa0_pWKr5V3b91BzzU73YmZIm3-BwAFQPEzrihCFi8jXcD6xru_MWZwKGdcxo8ytbfC5Fl_21yqHIepQ-paYABe84dOH0xQgq6yJu3T5Up3uMgNZAb9N1m2N4fj1BaoEmNWSMw',

      },

      params: {

        "key": 'NjFhOGMyNDE1NDllZWMwMjgzOGE0NDg1LzYxZDJmOWRiN2M3NjhiNzI2M2FlYjM3OC82MWQyZjdlNjdjNzY4YjcyNjNhZWE0NjAvMjAyMi0wMS0wM1QxMzozNzoxOC43MDYyOTU3NzRaLTIwOTU5MTI1LmpwZw==',  // key value goes here.
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// subscribe events. We need to use ngrok which is a cross-platform application that exposes local server ports to the Internet. 

app.post("/subscribe", function (req, res) {

	console.log(req.body);
	res.setHeader('Content-Type', 'application/json');

	res.end(
    JSON.stringify({
		"challenge": req.body.challenge
	}));
 })

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)   // x~hYJXMKeXx5XTmFUK>R~0#~
})

console.log('Navigate to http://localhost:4000/subscribe.'); // to receive events just press the test button at EXPORT API HELLO FLOW site and you should be receving events on init submit etc. 

//  Responding to the challenge : Once you receive the event, complete the sequence by responding with HTTP 200 and the challenge attribute value.

}); 


const WEBHOOK_TOKEN = "9-F-qkB-JFt5Jhav-jTdYCaR";

app.post('/subscribe/webhook',
  bodyParser.urlencoded({ extended: true }),
  function(req, res) {
      const token = req.body.secret;
      if (token !== WEBHOOK_TOKEN) {
          res.status(403).end();
          return;
      }

      if (req.body.event == 'incoming_message') {
        const content = req.body.content;
        const from_number = req.body.from_number;
        const phone_id = req.body.phone_id;

        // do something with the message, e.g. send an autoreply
        res.json({
          messages: [
            { content: "Thanks for your message!" }
          ]
        });
      }

      res.status(200).end();
  }
);
