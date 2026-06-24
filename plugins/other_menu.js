const { cmd } = require("../command");

cmd(
  {
    pattern: "other",
    react: "📂",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const otherText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮\n` +
`┃  📂 𝗢𝗧𝗛𝗘𝗥 - 𝗠𝗘𝗡𝗨             ┃\n` +
`┃━━━━━━━━━━━━━━━━━✦\n` +
`╰➤💾 Saves View Once image or video safely : .sv\n` +
`╰➤📸 Get the profile picture : .dp\n` +
`╭━━━━━━━━━━━━━━━━━✦\n` +
`┃  📂Made with ❤️ by\n` +
`╰─🔥 *RAMESH DISSANAYAKA* 🔥
      \n`.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true"; // <-- Replace with your image URL

      await rush.sendMessage(from, {
        image: { url: imageUrl },
        caption: otherText,
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating other.");
    }
  }
);
