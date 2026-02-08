const config = require('../config');
const { cmd } = require('../command');
const { sleep } = require('../lib/functions');
const { exec } = require("child_process");

cmd({
  pattern: "restart",
  react: '♻️',
  desc: "Restart the bot",
  category: "main",
}, async (conn, mek, m, { sender, reply }) => {

  try {

    // Normalize numbers
    const ownerNumber = String(config.BOT_OWNER).replace(/\D/g, '');
    const senderNumber = sender.split('@')[0].split(':')[0];

    // Owner check
    if (senderNumber !== ownerNumber) {
      return reply("❌ This command is only for the bot owner.");
    }

    await reply("♻️ Restarting...");
    await sleep(1500);

    exec("pm2 restart RUSH-TD");

  } catch (e) {
    console.error("Restart error:", e);
    reply("❌ Failed to restart:\n" + e);
  }

});
