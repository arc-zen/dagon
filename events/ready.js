const m = [
	"the world burn",
	"your mom lmfao",
	"the color blue",
	"me myself and I",
	"deez nuts",
	"your glistening eyes",
	"death in the face",
	"the world turn slowly",
	"the grass grow",
	"the future of humanity",
];
module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log("\nhello world.\nready.\n");
		setInterval(function () {
			client.user.setActivity(m[(m.length * Math.random()) | 0], {
				type: "WATCHING",
			});
		}, 60000);
		client.user.setStatus("online");
	},
};
