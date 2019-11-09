const Discord = require("discord.js");
const superagent = require("superagent");
module.exports = {
  name: "slap",
  category: "roleplay",
  description: "Slap someone!",
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!user)
      return message.channel.send("Please mention someone and try again!");
    superagent.get("https://nekos.life/api/v2/img/slap").end((err, response) => {
      let slapembed = new Discord.RichEmbed()
        .setDescription(`${message.author} Slapped ${user}`)
        .setImage(response.body.url)
        .setColor("RANDOM");
      message.channel.send(slapembed);
    });
  }
};
