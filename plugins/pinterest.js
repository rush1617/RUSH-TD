const { cmd } = require("../command");
const axios = require("axios");
const cheerio = require("cheerio");

cmd(
  {
    pattern: "pinterest",
     alias: ["pin", "pinterest"],
    react: "📌",
    desc: "Download images or videos from Pinterest",
    category: "download",
    filename: __filename,
  },
  async (rush, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("❌ *Please provide a Pinterest link.*\n\nExample: `.pinterest https://www.pinterest.com/pin/1234567890`");

      await rush.sendMessage(from, { react: { text: "📌", key: mek.key } });

      const { data: html } = await axios.get(q, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        },
      });

      const $ = cheerio.load(html);

      let scriptData = null;
      $("script[type='application/ld+json']").each((i, el) => {
        const jsonText = $(el).html();
        if (jsonText.includes("image")) {
          scriptData = JSON.parse(jsonText);
        }
      });

      if (!scriptData) return reply("❌ *Failed to extract media from Pinterest link.*");

      const mediaUrl = Array.isArray(scriptData.image) ? scriptData.image[0] : scriptData.image;
      const caption = `
╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ 𝗥𝗨𝗦𝗛 -𝗧𝗗 ®️             ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃📌 *𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
┃━━━━━━━━━━━━━━━━━━━━✦
╰➤ 📝 *Title:* *${scriptData.name || "Unknown"}*
╰➤ 🔗 *Source:* ${q}
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥
`;

      await rush.sendMessage(
        from,
        {
          image: { url: mediaUrl },
          caption,
        },
        { quoted: mek }
      );

    return reply("✅ *Thank you for using RUSH-TD!* 💖");
    } catch (e) {
      console.error("Pinterest Download Error:", e);
      reply("❌ *An error occurred while downloading Pinterest content.*");
    }
  }
);
