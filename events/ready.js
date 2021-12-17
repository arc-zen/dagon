const m = require("../config.json");
module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log("\nhello world.\nready.\n");
		// the reason i do this is because this sets the activity to
		// a value !!when the bot starts!! instead of waiting a minute for
		// it to change. I know it's inefficient but who the hell cares?
		const _r = m.m[(m.m.length * Math.random()) | 0];
		const _time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
		client.user.setActivity(_r, {
			type: "WATCHING",
		});
		console.log(`[${_time}] changed activity to "${_r}"`);
		setInterval(function () {
			const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
			const r = m.m[(m.m.length * Math.random()) | 0];
			client.user.setActivity(r, {
				type: "WATCHING",
			});
			console.log(`[${time}] changed activity to "${r}"`);
		}, 60000);
		client.user.setStatus("online");
	},
};
