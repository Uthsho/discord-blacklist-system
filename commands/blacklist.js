const db = require("quick.db");
const config = require("./../config.json");
exports.run = async(client, message, args) => {
  if(message.author.id == config.owner) {
    let user = client.users.get(args[0]);
    if(!user) return message.channel.send(`Invalid user or id ._.`);
    
    let fetched = db.fetch(`blacklist_${user.id}`)
    
    if(!fetched) {
      db.set(`blacklist_${user.id}`, true)
      message.channel.send(`Blacklisted!`);
    }else{ 
      return message.channel.send(`This user is already blacklisted!`);
    }
  }else{
    return message.channel.send(`No no`);
  }
}
