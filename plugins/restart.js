const { cmd } = require('../command');
const { sleep } = require('../lib/functions');
const { exec } = require("child_process");

cmd({
  pattern: "restart",
  fromMe: true,
  react: '♻️',
  desc: "Restart the bot",
  category: "main",
}, async (conn, mek, m, { reply }) => {
  try {

    await reply("♻️ Restarting...");
    await sleep(1500);

    exec("pm2 restart RUSH-TD");

  } catch (e) {
    console.error(e);
    reply("❌ Restart failed");
  }
});
