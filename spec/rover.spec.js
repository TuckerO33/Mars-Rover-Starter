const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function() {
    expect(new Rover("position")).toEqual({position: "position", mode: "NORMAL", generatorWatts: 110})
  });

  test("response returned by receiveMessage contains the name of the message", function() {
    expect(new Rover().receiveMessage(new Message('Test message with two commands', ["commands"]))).toEqual({message:'Test message with two commands', results:[{completed: false}],})
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(new Rover().receiveMessage(new Message('Test message with two commands', [7,8]))).toEqual({message:'Test message with two commands', results: [{completed: false}, {completed: false}]})
  });

  test("responds correctly to the status check command", function(){
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Status check", commands);
    let rover = new Rover();
    expect(rover.receiveMessage(message).results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: undefined}}])
  })

  test("responds correctly to the mode change command", function(){
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
    let message = new Message("Status check", commands);
    let rover = new Rover();
    expect(rover.receiveMessage(message).results).toEqual([{completed: true},{completed: true, roverStatus: {mode: 'LOW_POWER', generatorWatts: 110, position: undefined}}])
  })

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command("MOVE", "55"), new Command("STATUS_CHECK")];
    let message = new Message("Low power move attempt fails", commands);
    let rover = new Rover(10,'LOW_POWER');
    expect(rover.receiveMessage(message).results).toEqual([{completed: false},{completed: true, roverStatus: {mode: 'LOW_POWER', generatorWatts: 110, position: 10}}])
  })

  test("responds with the position for the move command", function(){
    let commands = [new Command("MOVE", 55), new Command("STATUS_CHECK")];
    let message = new Message("Move to 55 + status check", commands);
    let rover = new Rover(10);
    expect(rover.receiveMessage(message).results).toEqual([{completed: true},{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 55}}])
  })


  
});
