const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Returns server information."),
	async execute(interaction) {
		const ispartnered = interaction.guild.partnered
			? "server is partnered"
			: "server is not partered";
		let premiumtier = interaction.guild.premiumTier;
		if (premiumtier == "NONE") premiumtier = "0";
		else if (premiumtier == "TIER_1") premiumtier = "1";
		else if (premiumtier == "TIER_2") premiumtier = "2";
		else if (premiumtier == "TIER_3") premiumtier = "3";
		console.log(premiumtier);
		const embed = require("../generic.js")
			.embed.setTitle(interaction.guild.name)
			.setThumbnail(interaction.guild.iconURL())
			.setFooter(interaction.guild.id)
			.setDescription(
				interaction.guild.memberCount.toString() +
					" members" +
					"\n" +
					interaction.guild.channels.cache.size.toString() +
					" channels" +
					"\n" +
					interaction.guild.roles.cache.size.toString() +
					" roles" +
					"\n" +
					"the owner is " +
					`<@${interaction.guild.ownerId}>` +
					"\n" +
					ispartnered +
					"\n" +
					interaction.guild.premiumSubscriptionCount +
					" boosts (Level " +
					premiumtier +
					")\n" +
					"created at " +
					interaction.guild.createdAt.toUTCString()
			);
		await interaction.reply({ embeds: [embed] });
	},
};
