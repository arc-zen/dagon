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
		var i = 0;
		let starttime = new Date();
		const start = new Date();

		await interaction.deferReply();
		const resp = await fetch(
			`https://api.minehut.com/server/${interaction.options.getString(
				"server"
			)}?byName=true`
		)
			.then((response) => response.json())
			.then(i++);
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
			`${resp.server.name}.minehut.gg\n` +
			online +
			` (${resp.server.playerCount}/${resp.server.maxPlayers})` +
			"\n" +
			whiteliststatus +
			"\n" +
			`Time Created: ${creationdate.toUTCString()}\n` +
			`Server Type: ${resp.server.server_version_type}\n` +
			`Server Plan: ${resp.server.activeServerPlan}\n\n` +
			"**online players**:\n";
		if (resp.server.playerCount !== 0) {
			console.log(`\nstarting player loop for ${resp.server.name}`);
			for (const n of resp.server.players) {
				// change the UUIDs that the minehut api provides into minecraft usernames... using another api
				const onlineplayers = await fetch(
					`https://api.ashcon.app/mojang/v2/user/${n}`
				)
					.then((response) => response.json())
					.then(i++);

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
				console.log(`api call #${i}`);
				starttime = new Date();
			}
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
			.setFooter(
				`ID: ${resp.server._id}\nTime Elapsed: ${
					(new Date() - start) / 1000
				} seconds\nCalled an API ${i} times`
			);
		interaction.editReply({
			embeds: [embed],
		});
	},
};
