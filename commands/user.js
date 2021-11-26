const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Replies with Pong!"),
	async execute(interaction) {
		await interaction.reply("Pong!");
	},
};
