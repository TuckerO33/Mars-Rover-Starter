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
      let results = [];
      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i]["commandType"] === "STATUS_CHECK") {
            let roverStatus = {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts};
            results.push({completed: true, roverStatus: roverStatus,});
         } else if (message.commands[i]["commandType"] === "MODE_CHANGE" && message.commands[i]["value"] === "LOW_POWER") {
            this.mode = "LOW_POWER";
            results.push({completed: true});
         } else if (message.commands[i]["commandType"] === "MODE_CHANGE" && message.commands[i]["value"] === "NORMAL") {
            this.mode = "NORMAL";
            results.push({completed: true});
         } else if (message.commands[i]["commandType"] === "MOVE" && this.mode === "LOW_POWER"){
            results.push({completed: false});
         } else if (message.commands[i]["commandType"] === "MOVE"){
            this.position = message.commands[i]["value"];
            results.push({completed: true})
         } else {
            results.push({completed: false})
         }
      }
      let newMessage = {
         message: message.name, 
         results: results,
      };

      return newMessage
   }
}

module.exports = Rover;