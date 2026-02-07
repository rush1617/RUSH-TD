const { cmd } = require("../command");

cmd(
  {
    pattern: "owner",
    react: "👑",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const downloadText = 
`╭─ 👑 *RUSH-TD Owner Info* 👑\n` +
`│\n` +
`│👤 *NAME:* RAMESH DISSANAYAKA\n` +
`│🌍 *Location:* Sri Lanka🇱🇰 \n` +
`│📱 *WhatsApp:* +94775938007 \n` +
`╰───────────────⬣\n` +
`🚀 Powered By\n` +
`*RAMESH DISSANAYAKA* 🔥\n`.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Ramesh%20Dissanayaka.jpg?raw=true"; // <-- Replace with your image URL

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
