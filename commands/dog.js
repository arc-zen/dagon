const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("dog")
		.setDescription("random dog api as a command"),
	async execute(interaction) {
		await interaction.deferReply();
		const { message } = await fetch(
			"https://dog.ceo/api/breeds/image/random"
		).then((response) => response.json());
		const embed = new MessageEmbed().setImage(message);
		interaction.editReply({
			embeds: [embed],
		});
	},
};
