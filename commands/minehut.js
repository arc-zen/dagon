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
			? "server is **online**"
			: "server is **offline**";
		const whiteliststatus = resp.server["white-list"]
			? "server is whitelisted"
			: "server is not whitelisted";
		const embed = new MessageEmbed()
			.setTitle(resp.server.name)
			.setDescription(
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
					`Server Plan: ${resp.server.activeServerPlan}`
			);
		interaction.editReply({
			embeds: [embed],
		});
	},
};
