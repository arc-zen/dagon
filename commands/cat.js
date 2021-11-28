const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("random cat api as a command"),
	async execute(interaction) {
		await interaction.deferReply();
		const { file } = await fetch("https://aws.random.cat/meow").then(
			(response) => response.json()
		);
		const embed = new MessageEmbed().setImage(file);
		interaction.editReply({
			embeds: [embed],
		});
	},
};
