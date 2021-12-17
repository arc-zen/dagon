const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;
module.exports = {
	data: new SlashCommandBuilder()
		.setName("urban")
		.setDescription("attempts to generate text")
		.addStringOption((option) =>
			option
				.setName("term")
				.setDescription("term to look up")
				.setRequired(true)
		),
	async execute(interaction) {
		// for the sake of your eyes, collapse this in your editor. Please.
		const bad = [
			"dick",
			"pussy",
			"pubes",
			"ass",
			"anus",
			"boobs",
			"tits",
			"nigger",
			"hentai",
			"loli",
			"shota",
			"shotacon",
			"sex",
		];
		{
			await interaction.deferReply();
		}
		const term = interaction.options.getString("term");
		const query = new URLSearchParams({ term });

		const { list } = await fetch(
			`https://api.urbandictionary.com/v0/define?${query}`
		).then((response) => response.json());

		if (!list.length) {
			return interaction.editReply(
				`couldn't find anything called "${term}" lmfaoooo skill issue much`
			);
		}

		const [answer] = list;
		if (
			bad.some(
				(i) =>
					answer.definition.includes(i) &&
					interaction.channel.nsfw == false
			) ||
			bad.some(
				(i) =>
					answer.example.includes(i) &&
					interaction.channel.nsfw == false
			) ||
			bad.some(
				(i) =>
					answer.word.includes(i) && interaction.channel.nsfw == false
			)
		) {
			return interaction.editReply(
				`something was supposed to be said here, but it was NSFW and the channel it was sent in was not marked as NSFW. sorry about that lol`
			);
		}
		const embed = new MessageEmbed()
			.setColor("#EFFF00")
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: "Definition", value: trim(answer.definition, 1024) },
				{ name: "Example", value: trim(answer.example, 1024) },
				{
					name: "Rating",
					value: `${answer.thumbs_up} :thumbsup: || ${answer.thumbs_down} :thumbsdown:`,
				}
			);
		interaction.editReply({ embeds: [embed] });
	},
};
