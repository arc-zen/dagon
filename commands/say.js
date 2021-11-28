const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("say")
		.setDescription("returns a string as a discord message")
		.addStringOption((option) =>
			option
				.setName("text")
				.setDescription("the text to return to you")
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("quote")
				.setDescription(
					"whether or not to make it look like it is a quote from you"
				)
		),
	async execute(interaction) {
		const illegal = [
			"@",
			"www",
			"http",
			"https",
			"discord",
			"discord.gg",
			".com",
			".xyz",
			".html",
			".js",
			".py",
			".edu",
			".gov",
		];
		if (
			interaction.options.getString("text").length > 2000 ||
			interaction.options.getString("text").length < 1 ||
			illegal.some((i) =>
				interaction.options.getString("text").includes(i)
			)
		) {
			return interaction.reply("i cant bring myself to say that to you.");
		}
		if (interaction.options.getBoolean("quote")) {
			return await interaction.reply(
				`"${interaction.options.getString("text")}"\n*-${
					interaction.user.tag
				} ${new Date().toISOString().slice(0, 10).replace(/-/g, "/")}*`
			);
		} else {
			await interaction.reply(interaction.options.getString("text"));
		}
	},
};
