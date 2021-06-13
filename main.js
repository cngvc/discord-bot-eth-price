require("dotenv").config();
const Discord = require("discord.js");

const { getPrice } = require("./fetch/nomicsAPI");

const client = new Discord.Client();
client.login(process.env.DISCORDJS_BOT_TOKEN);

client.once("ready", async () => {
  const GUILD_ID = "846392662953033788";
  const guild = await client.guilds.fetch(GUILD_ID);
  const eth = setInterval(() => {
    const price = async () => {
      const price = await getPrice();
      guild.me.setNickname(`${price}`);
    };
    price();
  }, 5000);
});
