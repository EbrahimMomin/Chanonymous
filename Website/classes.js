export class Room {
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

    getMessages() {
        return this.messages; // Returns the list this.messages
    } // Used to get the messages in a room

    getUsers() {
        return this.users; // Returns the list this.users
    } // Used to get the messages in a room

    getCode() {
        return this.code; // Returns the code of the room
    } // Used to get the code of a room
} // A room is a place where you can chat and see chat messages. Gets exported

class User {
    constructor(username, room) {
        this.username = username; // The username, which would be "User1" or "User34"
        this.room = room; // The room the user is in
    }

    sendMessage(message) {
        this.room.sendMessage(this, message); // Call the Room.sendMessage(User, string) method to send a message
    } // The function that would be called when they send a message
} // A user are the indivisual users in the room. DOesn't get exported

class Message {
    constructor(user, message) {
        this.user = user; // The user who sent the message
        this.message = message; // The actual message of the Message
    } // The constructor of this class

    getMessageData() {
        return [this.user, this.message]; // Return the user and message, in array
    } // Returns the user and message of the Message in array, format: [user, message]
} // The message class, which fills up the messages array in room. Doesn't get exported