const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("minehut")
		.setDescription("gets info about a minehut server")
		.addStringOption((option) =>
			option
				.setName("server")
				.setDescription("MH server to get info from")
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		const resp = await fetch(
			`https://api.minehut.com/server/${interaction.options.getString(
				"server"
			)}?byName=true`
		).then((response) => response.json());
		if (resp.ok == false) {
			return await interaction.editReply(
				"i couldn't find that server... you sure it exists?"
			);
		}
		const online = resp.server.online
			? `${resp.server.name} is online`
			: `${resp.server.name} is offline`;
		const whiteliststatus = resp.server["white-list"]
			? `${resp.server.name} is whitelisted`
			: `${resp.server.name} is not whitelisted`;
		var description =
			online +
			"\n" +
			resp.server.playerCount +
			"/" +
			resp.server.maxPlayers +
			" players\n" +
			`IP: ${resp.server.name}.minehut.gg\n` +
			`ID: ${resp.server._id}\n` +
			`Server Type: ${resp.server.server_version_type}\n` +
			whiteliststatus +
			"\n" +
			`Server Plan: ${resp.server.activeServerPlan}\n` +
			"**online players**:\n";
		for (const n of resp.server.players) {
			const onlineplayers = await fetch(
				`https://api.ashcon.app/mojang/v2/user/${n}`
			).then((response) => response.json());
			description =
				description + onlineplayers.username.replace("*", "") + "\n";
		}
		const embed = new MessageEmbed()
			.setTitle(resp.server.name)
			.setDescription(description);
		interaction.editReply({
			embeds: [embed],
		});
	},
};
