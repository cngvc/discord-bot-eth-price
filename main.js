require("dotenv").config();
const Discord = require("discord.js");

const { getPrice } = require("./fetch/nomicsAPI");

const client = new Discord.Client();
client.login(process.env.DISCORDJS_BOT_TOKEN);

client.once("ready", async () => {
  let prevPrice = 0;
  const GUILD_ID = "846392662953033788";
  const guild = await client.guilds.fetch(GUILD_ID);
  const roleUp = guild.roles.cache.find(role => role.name === "Price Up");
  const roleDown = guild.roles.cache.find(role => role.name === "Price Down");

  const eth = setInterval(() => {
    const price = async () => {
      const price = await getPrice();
      guild.me.setNickname(`${price}`);
      if (price > prevPrice) {
        guild.me.roles.add(roleUp)
        guild.me.roles.remove(roleDown)
      } else {
        guild.me.roles.add(roleDown)
      }
      prevPrice = price;
    };
    price();
  }, 5000);
});
