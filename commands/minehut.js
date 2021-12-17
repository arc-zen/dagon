const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const c = require("../config.json");
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
		let starttime = new Date();
		const start = new Date();

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
		const creationdate = new Date(resp.server.creation);
		if (!resp.server.maxPlayers) resp.server.maxPlayers = "0";
		const online = resp.server.online
			? `${resp.server.name} is online`
			: `${resp.server.name} is offline`;
		const whiteliststatus = resp.server["white-list"]
			? `${resp.server.name} is whitelisted`
			: `${resp.server.name} is not whitelisted`;
		var description =
			online +
			"\n" +
			whiteliststatus +
			"\n" +
			resp.server.playerCount +
			"/" +
			resp.server.maxPlayers +
			" players\n" +
			`Time Created: ${creationdate.toUTCString()}\n` +
			`IP: ${resp.server.name}.minehut.gg\n` +
			`Server Type: ${resp.server.server_version_type}\n` +
			`Server Plan: ${resp.server.activeServerPlan}\n\n` +
			"**online players**:\n";
		if (resp.server.playerCount !== 0) {
			console.log(`\nstarting player loop for ${resp.server.name}`);
			for (const n of resp.server.players) {
				// change the UUIDs that the minehut api provides into minecraft usernames... using another api
				const onlineplayers = await fetch(
					`https://api.ashcon.app/mojang/v2/user/${n}`
				).then((response) => response.json());
				var username = onlineplayers.username;
				if (c.staff.includes(username)) {
					username = "☆ " + username;
				}
				description =
					description + username.replace("*", "(BEDROCK)") + "\n";
				const starttime2 = new Date();
				console.log("received username for " + onlineplayers.username);
				console.log(
					"took " + (starttime2 - starttime) / 1000 + " seconds"
				);
				starttime = new Date();
			}
			const now = new Date();
			var elapsed = `${start - now / 1000} seconds`;
		} else {
			description = description + "none lmfao";
		}
		const embed = new MessageEmbed()
			.setTitle(resp.server.name)
			.setDescription(description)
			.addField(
				"**MOTD**:",
				resp.server.motd.replace(/&[0-9|A-Z|a-z]/g, "")
			)
			.setFooter(`ID: ${resp.server._id} // Time Elapsed: ${elapsed}`);
		interaction.editReply({
			embeds: [embed],
		});
	},
};
