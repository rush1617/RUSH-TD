const { cmd } = require("../command");

cmd(
  {
    pattern: "menu",
    react: "⚙️",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const menuText =
`╭━━━━ ⚡ *RUSH-TD* ⚡ ━━━━╮\n` +
`┃    💠 *Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ*    ┃\n` +
`┃━━━━━━━━━━━━━━━━━━━✦\n` +
`╰➤📥 *DOWNLOAD* — Type: .download\n` +
`╰➤🎨 *LOGO* — Type: .logo\n` +
`╰➤🔍 *SEARCH* — Type: .search\n` +
`╰➤👑 *OWNER* — Type: .owner\n` +
`╭━━━━━━━━━━━━━━━━━━━✦\n` +
`┃ ⚙️ Made with ❤️ by\n` +
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




