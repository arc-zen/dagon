const { MessageEmbed } = require("discord.js");
const embed = new MessageEmbed();
if (new Date().getMilliseconds() % 2 == 0) embed.setColor("#D679C7");
else if (new Date().getMilliseconds() % 2 == 1) embed.setColor("#358AF6");
else embed.setColor("#D8DEE9");
exports.embed = embed;
