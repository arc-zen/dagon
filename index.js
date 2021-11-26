const { Client, Intents, Collection } = require("discord.js");
const c = require("./config.json");
const fs = require("fs");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
client.once("ready", () => {
	console.log("\nhello world.\nready.\n");
	client.user.setActivity("the world burn", { type: "WATCHING" });
	client.user.setStatus("online");
});
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
// ---------------------------------------------------------------------------------------------------------------------
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});
// ---------------------------------------------------------------------------------------------------------------------
client.login(c.token);
