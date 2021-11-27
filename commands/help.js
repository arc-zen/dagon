const { SlashCommandBuilder } = require("@discordjs/builders");
// "help me"
module.exports = {
	data: new SlashCommandBuilder().setName("help").setDescription("help me"),
	async execute(interaction) {
		await interaction.reply(
			"there is no help embed.\nliterally all my commands are slash commands\njust type a slash and click on my image lmfao"
		);
	},
};
