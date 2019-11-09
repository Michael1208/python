const Discord = require("discord.js");
const c = require("./config.json");
const Enmap = require("enmap");
const { config } = require("dotenv");
const fs = require("fs");
const db = require("quick.db");
const client = new Discord.Client({
  disableEveryone: true
});
const active = new Map();
const OwnerID = c.OwnerID;
client.commands = new Enmap();
client.aliases = new Enmap();
client.categories = fs.readdirSync("./commands/");

config({
  path: __dirname + "/.env"
});

["commands"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on("ready", () => {
  client.user.setStatus("dnd");
  client.user.setActivity(
  ` Watching over Dusk | ::help |`
  );
  console.log(`Logged in as ${client.user.tag}.`);
});

client.on("message", async message => {
  let ops = {
    ownerID: OwnerID,
    active: active
  };
  if (message.author.bot) return;
  var prefix = "::";
  if (message.isMentioned(client.user)) {
    const embed = new Discord.RichEmbed().setDescription(
      `Hello ${message.author}, My prefix is ${prefix} in this guild. use ${prefix}help to see a list of my commands.`
    );
    message.channel.send(embed);
  }
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args, ops);
});

//client.login(process.env.TOKEN);

process.on("unhandledRejection", error =>
  console.error("Uncaught Promise Rejection", error)
);

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.jsneonbot}.glitch.me/`);
}, 280000);

client.login(c.token);
