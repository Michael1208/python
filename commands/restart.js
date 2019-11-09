const Discord = require("discord.js");

module.exports = {
  name: "restart",
  category: "owners",
  description: "restarts the bot",
  aliases: ["r", "rebbot", "re"],
  Usage: "restart",
  run: async (client, message, args, ops) => {
    if (
      message.author.id !== "349499497774055429" &&
      message.author.id !== "505366642230951984" &&
      message.author.id !== "" &&
      message.author.id !== "" &&
      message.author.id !== ""
    )
      return message.channel.send("Owners Only");
    message.channel.send("Restarting");
    console.log("Restarting");
    process.exit(1);
  }
}; // ??
