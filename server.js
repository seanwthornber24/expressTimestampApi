// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const moment = require('moment');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", (req, res) => {
  if (req.params.date === undefined) {
    res.json({"unix": Date.parse(new Date()), "utc": new Date().toUTCString()});
  }
  else if (Number(req.params.date)) {
    res.json({"unix": Number(req.params.date), "utc": new Date(Number(req.params.date)).toUTCString()});
  }
  else if(!isNaN(Date.parse(req.params.date))) {
    let date = new Date(req.params.date)
    res.json({"unix": Date.parse(date), "utc": date.toUTCString()});
  }
  else {
    res.json({"error": "Invalid Date"});
  }
});


// listen for requests :)
let port = process.env.PORT || 3000

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
