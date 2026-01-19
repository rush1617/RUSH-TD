const { cmd } = require("../command");

cmd(
  {
    pattern: "menu",
    react: "⚙️",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const menuText = `
╭━━ ⚡ *RUSH-TD*⚡ ━━╮
┃  💠 *Ｍ Ａ Ｉ Ｎ - Ｍ Ｅ Ｎ Ｕ*
┃━━━━━━━━━━━━━━━━━━━━━✦
╰➤ 📥 *DOWNLOAD* — Type: .download
╰➤ 🎨 *LOGO* — Type: .logo
╰➤ 🔍 *SEARCH* — Type: .search
┃━━━━━━━━━━━━━━━━━━━━━✦
┃ ⚙️ Made with ❤️ by
╰─🔥 *_RAMESH DISSANAYAKA_* 🔥
      `.trim();

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

