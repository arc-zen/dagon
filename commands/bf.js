const { SlashCommandBuilder } = require("@discordjs/builders");
// const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("brainfuck")
		.setDescription("bf interpreter")
		.addStringOption((option) =>
			option
				.setName("code")
				.setDescription("brainfuck code to run")
				.setRequired(true)
		),
	async execute(interaction) {
		// write a brainfuck interpreter
		function interpretBrainfuck(c) {
			const MEM = 30000;
			const memory = new Array(MEM).fill(0);
			let i,
				m = 0;
			let a = [];
			let p,
				inp,
				o = "";
			// we refuse inputs lol
			// V this gets input from cell
			function so(v) {
				o += String.fromCharCode(v);
			}
		}
		var output = interpretBrainfuck(interaction.options.getString("code"));
		// var embed = new MessageEmbed()
		// 	.setTitle("Brainfuck")
		// 	.setDescription(output)
		// 	.setColor();
		console.log(output);
		interaction.reply("wo(r)k in progress >:( ");
	},
};
