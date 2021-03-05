// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Basic Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/make', (req, res) => res.sendFile(path.join(__dirname, 'make.html')));
app.get('/view', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

const reservations = [];

//Display all reservations
app.get('/view', (req, res) => res.json(reservations));


app.post('/make', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newReservation = req.body;
  
    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
    console.log(newReservation);
  
    reservations.push(newReservation);
    res.json(newReservation);
  });

//Start Server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
