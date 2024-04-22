const Command = require('./command.js');

class Message extends Command {
   constructor(name, commands) {
    super(commandType, value);
    this.name = name;
     if (!name) {
       throw Error("Name required.");
     }
     this.commands = bundleCommands()
  }
}
module.exports = Message;