
const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "apk",
    alias: ["apk"],
    react: "📍",
    desc: "Download your favourite apk",
    category: "download",
    filename: __filename,
  },
  async (test, mek, m, { q, reply, from }) => {
    try {
      if (!q) return reply("❌ *Please provide an app name to search!*");

      await test.sendMessage(from, { react: { text: "📍", key: mek.key } });

      const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(q)}/limit=1`;
      const { data } = await axios.get(apiUrl);

      if (!data?.datalist?.list?.length) {
        return reply("⚠️ *No apps found with the given name.*");
      }

      const app = data.datalist.list[0];
      const appSize = (app.size / 1048576).toFixed(2); 
      
      const caption =
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃🪬𝗔𝗣𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🪬
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;

      await test.sendMessage(
        from,
        {
          image: { url: app.icon },
          caption: caption,
        },
        { quoted: mek }
      );

      await test.sendMessage(
        from,
        {
          document: { url: app.file.path_alt },
          fileName: `${app.name}.apk`,
          mimetype: "application/vnd.android.package-archive",
        },
        { quoted: mek }
      );

      await test.sendMessage(from, { react: { text: "📍", key: mek.key } });

return reply("✅ *Thank you for using RUSH-TD! Enjoy* 💖");
      
    } catch (err) {
      console.error("❌ APK Downloader Error:", err);
      reply("❌ *An error occurred while downloading the APK.*");
    }
  }
);


