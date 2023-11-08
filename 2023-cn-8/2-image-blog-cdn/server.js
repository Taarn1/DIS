const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");

const app = express();
const port = 3000;

// Use bodyParser middleware to parse JSON request body
app.use(express.json());

// Public folders
app.use(express.static("public"));

// Set up the multer storage engine for file uploads
// link: https://www.npmjs.com/package/multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sqlite3 er en database, der gemmer data i en fil
// link: https://www.npmjs.com/package/sqlite3
const db = new sqlite3.Database("./db.sqlite");

db.serialize(function () {
  // Tabellen indeholder primærnøgle id, url, tidspunkt og caption
  db.run(
    "CREATE TABLE if not exists images (id integer primary key, url text not null, datetime integer, caption text)"
  );
});

// Configure with your Cloudinary credentials
// link: https://cloudinary.com/documentation/node_integration
// link: https://www.npmjs.com/package/cloudinary
// find credentials here: https://console.cloudinary.com/console/
cloudinary.config({
  cloud_name: "xxx", // add your cloud_name
  api_key: "xxx", // add your api_key
  api_secret: "xxx", // add your api_secret
  secure: true,
});

// Route to handle image uploads
app.post("/api/images", upload.single("image"), async (req, res, next) => {
  const authorizationKey = req.body.key;

  try {
    const response = await axios.post("http://localhost:5000/authorization", {
      authorizationKey: authorizationKey,
    });
    if (response.status === 200) {
      try {
        // Access the image buffer
        const imageBuffer = req.file.buffer;
        const caption = req.body.caption;
        const tmpFilePath = "./public/images/" + req.file.originalname;

        // Write the buffer to a temporary file
        fs.writeFileSync(tmpFilePath, imageBuffer);

        // Specify the folder in the public_id when uploading
        const uploadOptions = {
          public_id: "cdn-example/" + req.file.originalname,
          resource_type: "auto",
        };

        try {
          // Upload the file to Cloudinary with the specified folder
          const result = await cloudinary.uploader.upload(
            tmpFilePath,
            uploadOptions
          );
          // Delete the temporary file
          fs.unlinkSync(tmpFilePath);
          // Tilføjer en række i databasen med url og tidspunkt
          db.serialize(function () {
            db.run(
              "INSERT INTO images (url, datetime, caption) VALUES (?, ?, ?)",
              [result.secure_url, Date.now(), caption],
              function (err) {
                if (err) {
                  console.error(err);
                  return res.status(500).json(err);
                }
              }
            );
          });
          // Send the URL of the uploaded image in the response
          res.status(200).json({ imageUrl: result.secure_url });
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "File upload to Cloudinary failed." });
        }
      } catch (error) {
        console.error(`Error `, error.message);
        return res.status(500).json(error);
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return res.sendStatus(401);
    } else {
      // Handle other errors
      console.error("Error:", error);
      // Handle any other errors that might occur during the request
    }
  }
});

app.get("/api/images", (req, res, next) => {
  try {
    db.serialize(function () {
      db.all("SELECT * FROM images", function (err, data) {
        res.json({ images: data });
      });
    });
  } catch (err) {
    console.error(`Error `, err.message);
    res.status(500).json(err);
  }
});

app.post("/api/authorization", async (req, res) => {
  const authorizationKey = req.body.authorizationKey;
  // make http post request to localhost:5000/authorization using auth key
  try {
    const response = await axios.post("http://localhost:5000/authorization", {
      authorizationKey: authorizationKey,
    });
    console.log("Response:", response);
    if (response.status === 200) {
      console.log("Authorized!");
      return res.sendStatus(200);
    } else if (error.response.status === 401) {
      console.log("Not authorized!");
      return res.sendStatus(401);
    } else if (error.response.status === 500) {
      console.log("Server error!");
      return res.sendStatus(500);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle the 401 error here
      console.log("Not authorized! error");
      return res.sendStatus(401);
    } else {
      // Handle other errors
      console.error("Error:", error);
      // Handle any other errors that might occur during the request
    }
  }
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Serve style.css
app.get("/style", (req, res) => {
  res.sendFile(__dirname + "/public/style.css");
});

// Serve on port
var server = app.listen(port, function () {
  console.log("Listening on port %d", server.address().port);
});
