const { SlashCommandBuilder } = require("@discordjs/builders");
const clockemojis = [
	"1",
	"10",
	"1030",
	"11",
	"1130",
	"12",
	"1230",
	"130",
	"2",
	"230",
	"3",
	"330",
	"4",
	"430",
	"5",
	"530",
	"6",
	"630",
	"7",
	"730",
	"8",
	"830",
	"9",
	"930",
];
module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	async execute(interaction) {
		const msg = await interaction.reply({
			content: `:clock${
				clockemojis[(clockemojis.length * Math.random()) | 0]
			}:`,
			fetchReply: true,
		});
		interaction.editReply(
			`:ping_pong: Pong! \`${
				msg.createdTimestamp - interaction.createdTimestamp
			}ms\``
		);
	},
};
