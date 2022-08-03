import { Room } from './classes.js'; //Import the Room class from classes.js, the other classes don't get exported

const express = require('express'); // Get express package

const app = express(); // Create the actual express app

const PORT = process.env.PORT || 4001; // Get the port on which the app will listen

const rooms = [];

app.use(express.static('public')); //Serve the front end, located in Website/public


app.get('/room/:room_number', (request, response, next) => {
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

    response.send(response.json(room)); // Sends the variable room in json format because it is a javascript object

}); // Code runs when server gets a get request, the arguements request, response, and next get passed in, room_number can be anything

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // Print out the port the app is listening on
}); // Listen for connections

class Room {
    constructor(code) {
        this.code = code; // Sets this.code to the code parameter which is passed into the constructor
        this.users = []; // Sets this.users to a empty array which will be filled as users join the room
        this.messages = []; // Sets this.messages to a empty array which will be filled as users send messages
        this.usersInRoom = 0; // Sets this.usersInRoom to 0, which will change when users join
    } // The constructor of the class

    letUserJoin() {
        const username = "User" + this.usersInRoom; // Adds the string "User" and the integer this.usersInRoom and sets that to be the users name
        const user = new User(username, this); // Create the user instance
        this.users.push(user); // Add a user instance to the array this.users
        this.usersInRoom++; // Increment this.usersInRoom to make the next user have a different id
        return user; // Return user to be stored
    } // Function is called when user joins

    letUserLeave(user) {
        const leaveIndex = this.users.indexOf(user); // Get the index of the user in this.users so it can be removed

        if (leaveIndex > -1) {
            this.users.splice(leaveIndex, 1); // Remove the user from this.users if user is in this.users
        } // Check if user is in this.users

    }

    sendMessage(user, message) {
        this.messages.push(new Message(user, message)); // Adds a message to this.messages
    } // Called by User.sendMessage(string) when user sends a message.
} // A room is a place where you can chat and see chat messages

class User {
    constructor(username, room) {
        this.username = username; // The username, which would be "User1" or "User34"
        this.room = room; // The room the user is in
    }

    sendMessage(message) {
        this.room.sendMessage(this, message); // Call the Room.sendMessage(User, string) method to send a message
    } // The function that would be called when they send a message
} // A user are the indivisual users in the room

class Message {
    constructor(user, message) {
        this.user = user; // The user who sent the message
        this.message = message; // The actual message of the Message
    } // The constructor of this class

    getMessageData() {
        return [this.user, this.message]; // Return the user and message, in array
    } // Returns the user and message of the Message in array, format: [user, message]
} // The message class, which fills up the messages array in Room

room = new Room("1");
const testUser = room.letUserJoin();
room.sendMessage(testUser, "Hello");
room.letUserLeave(testUser);