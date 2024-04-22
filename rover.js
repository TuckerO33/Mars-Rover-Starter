const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
    }
   receiveMessage(message){ 
      let newMessage = message;
      return newMessage
   }
}

module.exports = Rover;