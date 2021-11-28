const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("text")
		.setDescription("attempts to generate text?")
		.addStringOption((option) =>
			option
				.setName("text")
				.setDescription("the text to generate")
				.setRequired(true)
		),
	async execute(interaction) {
		const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext("2d");

		const background = await Canvas.loadImage(
			"https://github.com/arc-zen/WandererInJS/blob/master/img/wallpaper.png"
		);

		// This uses the canvas dimensions to stretch the image onto the entire canvas
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		// Use the helpful Attachment class structure to process the file for you
		const attachment = new MessageAttachment(
			canvas.toBuffer(),
			"image.png"
		);

		interaction.reply({ files: [attachment] });
	},
};
