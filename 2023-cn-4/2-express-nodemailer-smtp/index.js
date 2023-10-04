const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Use middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// list of recipient emails
const recipientEmails = [];

// Øvelse 3: Lav de forskellige endpoints som beskrevet nedenfor
// - GET '/' sender HTML-filen index.html til klienten
app.get("/", function (req, res) {
  //2-express-nodemailer-smtp/client/index.html
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
// - POST '/' tilføjer email adressen som sendes fra klienten til listen recipientEmails
app.post("/ ", function (req, res) {
  recipientEmails.push(req.body.email);
  res.redirect("/");
});
// - GET '/emails' returnerer listen recipientEmails i JSON format til klienten
app.get("/emails", function (req, res) {
  res.json(recipientEmails);
});

// Øvelse 4: Kig på Øvelse 1 og 2 og tilføj funktionaliteten til det endpoint som er beskrevet nedenfor
// - POST '/send' sender en mail til alle på listen recipientEmails som indeholder en besked fra klienten

app.get("/", function (req, res) {
  // send the index.html file to the client
  // hint: res.sendFile()
  // hint: use path module to resolve the path to index.html
  res.send("Ingen index.html fil");
});

app.post("/", function (req, res) {
  // push the email from the request to the list of recipient emails
  // hint: req.body.email
  res.redirect("/");
});

app.get("/emails", function (req, res) {
    // return the list of recipient emails in JSON format
    // hint: res.json()
    res.redirect("/");
});

app.post("/send", function (req, res) {
  // send the email with the message to all recipients
  // hint: req.body.message
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
