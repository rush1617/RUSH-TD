const { cmd } = require("../command");
const yts = require("yt-search");

cmd(
  {
    pattern: "yts",
    alias: ["yts", "youtubesearch"],
    react: "🔎",
    desc: "You Tube Search",
    category: "search",
    filename: __filename,
  },
  async (
    rush,
    mek,
    m,
    {
      from,
      quoted,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a search query!* 🔍");

      reply("*Searching YouTube for you...* ⌛");

      const search = await yts(q);

      if (!search || !search.all || search.all.length === 0) {
        return reply("*No results found on YouTube.* ☹️");
      }

      const results = search.videos.slice(0, 3); 
      let formattedResults = results.map((v, i) => (
        `🎬 *${i + 1}. ${v.title}*\n📅 ${v.ago} | ⌛ ${v.timestamp} | 👁️ ${v.views.toLocaleString()} views\n🔗 ${v.url}`
      )).join("\n\n");

      const caption =
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️𝗥𝗨𝗦𝗛 -𝗧𝗗®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃📌𝗬𝗢𝗨 𝗧𝗨𝗕𝗘 𝗦𝗘𝗔𝗥𝗖𝗛📌
┃━━━━━━━━━━━━━━━━━━━━✦
╰➤🔎 *Query*: ${q}
${formattedResults}
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥
   `;

      await rush.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/rush1617/RUSH-TD/blob/main/images/yts.png?raw=true",
          },
          caption,
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      reply("*An error occurred while searching YouTube.* ❌");
    }
  }
);
