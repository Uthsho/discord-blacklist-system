const Enmap = require("enmap");
const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const client = new Discord.Client();
const config = require("./config.json");
client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

client.on("ready", () => {
  console.log("ready");
});

const prefix = config.prefix
client.on("message", async message => {
  if (message.author.bot) return;
  
  let user = db.get(`blacklist_${message.author.id}`);
  if(user == true) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
});
// finally done!
client.login(config.token)
