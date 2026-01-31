const { cmd } = require("../command");

cmd(
  {
    pattern: "bot",
    react: "🤖",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const downloadText = 
`╭───〔 🤖 *Bot Status* 〕───⬣\n` +
`│\n` +
`│ 🔹 *Bot Name:* 🔮 RUSH-TD 🔮\n` +
`│ 🔹 *Status:* ✅ Online & Active\n` +
`│ 🔹 *Ping:* ${ping} ms\n` +
`│ 🔹 *Owner:* RAMESH DISSANAYAKA \n` +
`│ 🔹 *Version:* ${config.VERSION || '1.0.0'}\n` +
`│\n` +
`╰───────────────⬣\n`.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/RUSH-TD%201.png?raw=true"; // <-- Replace with your image URL

      await rush.sendMessage(from, {
        image: { url: imageUrl },
        caption: downloadText,
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating download.");
    }
  }
);
