const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    alias: ["song"],
    react: "🎶",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (
    rush,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("❌ *Please provide a song name or YouTube link*");

      const search = await yts(q);
      if (!search || !search.videos || search.videos.length === 0) {
        return reply("❌ *No results found for your query.*");
      }
      const data = search.videos[0];
      if (!data || !data.url) {
        return reply("❌ *Couldn't get song details. Try another one.*");
      }
      const url = data.url;

      // Handle missing details safely
      const title = data.title || "Unknown";
      const timestamp = data.timestamp || "00:00";
      const ago = data.ago || "Unknown";
      const views = typeof data.views === "number" ? data.views.toLocaleString() : "Unknown";
      const thumbnail = data.thumbnail || "";

      let desc = `
🌟 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 🌟    
════════════════════════     
🔮  R U S H - T D  🔮  
      🎧 𝙎𝙊𝙉𝙂 𝘿𝙊𝙒𝙉𝙇𝙾𝘼𝘿𝙀𝙍 🎧  
════════════════════════   

🎼 Let the rhythm guide you... 🎼
🚀 Pow. By RAMESH DISSANAYAKA 🔥
─────────────────────────
🎬 *Title:* ${title}
⏱️ *Duration:* ${timestamp}
📅 *Uploaded:* ${ago}
👀 *Views:* ${views}
🔗 *Watch Here:* ${url}
─────────────────────────
🎼 Made with ❤️ by RAMESH DISSANAYAKA💫
`;

      await rush.sendMessage(
        from,
        { image: { url: thumbnail }, caption: desc },
        { quoted: mek }
      );

      const quality = "256";
      const songData = await ytmp3(url, quality);

      if (!songData || !songData.download || !songData.download.url) {
        return reply("❌ *Failed to download the song. Please try another one.*");
      }

      // Duration safe parse
      let durationparts = duration.split(':');
