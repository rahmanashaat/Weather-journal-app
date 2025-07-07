import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

let projectData = {};

// Create an instance of the app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('Website'));

// Routes
app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    feel: req.body.feel,
  };
  res.send(projectData);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
