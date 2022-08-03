import { Room } from './classes.js'; //Import the Room class from classes.js, the other classes don't get exported

import express from 'express' // Get express package

const app = express(); // Create the actual express app

const PORT = process.env.PORT || 4001; // Get the port on which the app will listen

const rooms = [];

app.use(express.static('public')); //Serve the front end, located in Website/public


app.get('/room', (request, response, next) => {
    var roomExists = false; // Creates a new variable roomExists and sets it to false
    var user; // Creates a new variable user

    var room; // Creates a new variable room, which will be returned

    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].getCode() == request.params.room_number) {
            room = rooms[i]; // Sets the variable room to the room which has the code the user entered
            user = room.letUserJoin(); // Lets the user join the room, and sets the user variable to the user that is returned
            roomExists = true; // Sets the variable roomExists to true

        } // Check if the room exists
    } // Loop through all the rooms

    if (!roomExists) {
        room = new Room(request.params.room_number);
        user = room.letUserJoin();
    } // Runs if room doesn't exist

    response.send(room.getCode()); // Sends the variable room in json format because it is a javascript object

    console.log('GET Request'); // Prints GET Request to the console when the server recieves a get request
}); // Code runs when server gets a get request, the arguements request, response, and next get passed in, room_number can be anything

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // Print out the port the app is listening on
}); // Listen for connections