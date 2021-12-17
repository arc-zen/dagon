const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("text")
		.setDescription("attempts to generate text")
		.addStringOption((option) =>
			option
				.setName("text")
				.setDescription("the text to generate")
				.setRequired(true)
		),
	async execute(interaction) {
		var nonasciitest = /[^A-Za-z 0-9_,.-?!.<>/'";:{}()|]/;
		if (nonasciitest.test(interaction.options.getString("text"))) {
			return interaction.reply(
				"text contains non-ascii characters!!! i will complain and now subsequently not do anything!!! >:("
			);
		}
		Canvas.registerFont("./misc/FiraCode-Retina.ttf", {
			family: "Monospace",
		});
		if (interaction.options.getString("text").length >= 28) {
			return interaction.reply(
				"i can only render up to 27 characters until arczen finds a new way to do this thing"
			);
		}
		const canvas = Canvas.createCanvas(1000, 80);
		const context = canvas.getContext("2d");
		context.font = "60px 'Fira Code Retina'";
		context.fillStyle = "#ffffff";
		context.fillText(interaction.options.getString("text"), 0, 60);
		const attachment = new MessageAttachment(
			canvas.toBuffer(),
			"image.png"
		);

		interaction.reply({ files: [attachment] });
	},
};
