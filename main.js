import { Bot } from "./src/bot"
import { command_mapping } from "./commands"


// exmaple command
// every command function will need to take the interaction as a parameter and 
// return an interaction.reply object or raw json data for the response
async function example(interaction) {
  return interaction.reply({ content: "this is an exmaple command" })
}

// command_mapping is just a dictionary that maps command names to their functions
// in this example I am importing a command_mapping from another file and adding
// an extra command to it below
command_mapping["example"] = example;

// Your bots public key
const PUBLIC_KEY = "6f1a7afc9e4b4d00a4d79587f01a125c3f03de3a624c70c7cc9ad26d4746def7";
const bot = new Bot(PUBLIC_KEY, command_mapping)

// just add bot.on_interaction into the events
addEventListener("fetch", (event) => {
  event.respondWith(bot.on_interaction(event.request));
});


