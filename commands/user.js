const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Returns user information")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("specify a user to return information from")
				.setRequired(false)
		),
	async execute(interaction) {
		if (!interaction.options.getUser("user")) {
			var target = interaction.user;
		} else {
			target = interaction.options.getUser("user");
		}
		const isbot = target.bot ? "user is a bot" : "user is not a bot";
		const embed = new MessageEmbed()
			.setTitle(target.tag)
			.setThumbnail(target.displayAvatarURL())
			.setFooter(target.id)
			.setDescription(
				isbot + "\n" + "joined " + target.createdAt.toUTCString()
			);
		await interaction.reply({ embeds: [embed] });
	},
};
