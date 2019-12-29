const db = require("quick.db");
const config = require("./../config.json");
exports.run = async(client, message, args) => {
  if(!message.author.id === config.owner) {
    let user = client.users.get(args[0]);
    if(!user) return message.channel.send(`Invalid user or id ._.`);
  
    let fetched = db.fetch(`blacklist_${user.id}`)
    if(!fetched) {
      return message.channel.send(`This user is not blacklisted`);
    }else{
      db.delete(`blacklist_${user.id}`)
      message.channel.send(`Unblacklisted!`)
    }
  }else{
    return message.channel.send(`No no`)
  }
  
}
