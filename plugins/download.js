const { cmd } = require("../command");

cmd(
  {
    pattern: "download",
    react: "📥",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const downloadText = `
╭━━ ⚡ *RUSH-TD*⚡ ━━╮
┃  💠 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 - 𝗠𝗘𝗡𝗨
┃━━━━━━━━━━━━━━━━━━━━━✦
╰➤🎶 *SONG* - Type: .song
╰➤ 🎼 *TIK TOK* - Type: .tiktok
╰➤ 📼*YOUTUBE* - Type: .video
╰➤ 📘*FACEBOOK* - Type: .fb
╰➤ 📍 *APK* — Type: .apk
┃━━━━━━━━━━━━━━━━━━━━━✦
┃  📥Made with ❤️ by
╰─🔥 *_RAMESH DISSANAYAKA_* 🔥
      `.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true"; // <-- Replace with your image URL

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
