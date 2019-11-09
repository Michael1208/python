const Discord = require("discord.js");
const superagent = require("superagent");
module.exports = {
  name: "woof",
  category: "fun",
  description: "Posts a random dog!",
  run: async (client, message, args) => {
    superagent.get("https://random.dog/woof.json").end((err, response) => {
      let dogembed = new Discord.RichEmbed()
        .setDescription(`Here's your random dog!`)
        .setImage(response.body.url)
        .setColor("RANDOM");
      message.channel.send(dogembed);
    });
  }
};
