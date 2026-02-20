const { cmd } = require("../command");

cmd(
  {
    pattern: "system",
    react: "🛠️",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const menuText =
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃    🛠️ 𝗦𝗬𝗦𝗧𝗘𝗠-𝗠𝗘𝗡𝗨           ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤⚙️ *MENU* - Type: . menu\n` +
`╰➤👀 *ALIVE* - Type: .alive\n` +
`╰➤🤖 *BOT* - Type: .bot\n` +
`╰➤♻️ *RESTART* - Type: .restart\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  🛠️Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥
      \n`.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/main-menu.png?raw=true"; // <-- Replace with your image URL

      await rush.sendMessage(from, {
        image: { url: imageUrl },
        caption: menuText,
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating menu.");
    }
  }
);



