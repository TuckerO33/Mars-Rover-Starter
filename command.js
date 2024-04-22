class Command {
   constructor(commandType = "default", value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
   bundleCommands(commandType, value) {
    let bundledCommands = {commandType, value};
    return bundledCommands;
   }
 }

 module.exports = Command;