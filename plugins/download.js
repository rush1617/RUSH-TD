
const { cmd } = require("../command");
const { ytmp3, ytmp4, tiktok } = require("sadaslk-dlcore");
const yts = require("yt-search");


async function getYoutube(query) {
  const isUrl = /(youtube\.com|youtu\.be)/i.test(query);
  if (isUrl) {
    const id = query.split("v=")[1] || query.split("/").pop();
    const info = await yts({ videoId: id });
    return info;
  }

  const search = await yts(query);
  if (!search.videos.length) return null;
  return search.videos[0];
}


cmd(
  {
    pattern: "ytmp3",
    alias: ["song"],
    react: "🎶",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (rush, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("❌ *Please Enter a song name or YouTube link*");

      const video = await getYoutube(q);
      if (!video) return reply("❌ No results found");

      const caption = `🌟 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 🌟    
════════════════════════     
🔮  R U S H - T D  🔮  
      🎧 𝙎𝙊𝙉𝙂 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 🎧  
════════════════════════   

🎼 Let the rhythm guide you... 🎼
🚀 Pow. By RAMESH DISSANAYAKA 🔥
─────────────────────────
🎬 *${video.title}*
👤 Channel: ${video.author.name}
⏱ Duration: ${video.timestamp}
👀 Views: ${video.views.toLocaleString()}
🔗 ${video.url}
─────────────────────────
🎼 Made with ❤️ by RAMESH DISSANAYAKA💫`;

      await rush.sendMessage(
        from,
        {
          image: { url: video.thumbnail },
          caption,
        },
        { quoted: mek }
      );


      const data = await ytmp3(video.url);
      if (!data?.url) return reply("⏳ *Sorry, ❌ Failed to download MP3");

     await rush.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
        },
        { quoted: mek }
      );

      await rush.sendMessage(
        from,
        {
          document: { url: songData.download.url },
          mimetype: "audio/mpeg",
          fileName: `${data.title}.mp3`,
          caption: "🎶 *Your song is ready to be played!* ",
        },
        { quoted: mek }
      );

      return reply("✅ *Thank you for using RUSH-TD! Enjoy your music* 🎧💖");
    } catch (e) {
      console.log(e);
      reply(`❌ *Error:* ${e.message} 😞`);
    }
  }
);

cmd(
  {
    pattern: "ytmp4",
    alias: ["video"],
    react: "📼",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (rush, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("🎬 Send video name or YouTube link");

      reply("🔎 Searching YouTube...");
      const video = await getYoutube(q);
      if (!video) return reply("❌ No results found");

      const caption = `🌟 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 🌟    
════════════════════════     
🔮  R U S H - T D  🔮  
      📼 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 📼 
════════════════════════   

📼 Let the video guide you... 📼
🚀 Pow. By RAMESH DISSANAYAKA 🔥
─────────────────────────
🎬 *${video.title}*
👤 Channel: ${video.author.name}
⏱ Duration: ${video.timestamp}
📅 Uploaded: ${video.ago}
👀 Views: ${data.views.toLocaleString()}
🔗 ${video.url}
─────────────────────────
📼 Made with ❤️ by RAMESH DISSANAYAKA💫`;

      await rush.sendMessage(
        from,
        {
          image: { url: video.thumbnail },
          caption,
        },
        { quoted: mek }
      );

      reply("⬇️ Downloading video...");

      const data = await ytmp4(video.url, {
        format: "mp4",
        videoQuality: "480",
      });

      if (!data?.url) return reply("❌ Failed to download video");

await rush.sendMessage(
  from,
  {
    video: { url: data.url },
    mimetype: "video/mp4",
    fileName: data.filename || "youtube_video.mp4",
    caption: "📼 *Your Video is ready to be played!*",
    gifPlayback: false,
  },
  { quoted: mek }
);
    } catch (e) {
      console.log("YTMP4 ERROR:", e);
      reply("❌ Error while downloading video");
    }
  }
);


cmd(
  {
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download TikTok video",
    category: "download",
    filename: __filename,
  },
  async (rush, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("📱 Send TikTok link");

      reply("⬇️ Downloading TikTok video...");

      const data = await tiktok(q);
      if (!data?.no_watermark)
        return reply("❌ Failed to download TikTok video");

      const caption = `🌟 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 🌟    
════════════════════════     
🔮  R U S H - T D  🔮  

🪬𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘🪬 
══════════════════  

🚀 Pow. By RAMESH DISSANAYAKA 🔥
─────────────────
🎵 *${data.title || "TikTok Video"}*
👤 Author: ${data.author || "Unknown"}
⏱ Duration: ${data.runtime}
        
        ──────────────────
🪬 Made with ❤️ by RAMESH DISSANAYAKA💫`;

      await rush.sendMessage(
        from,
        {
          video: { url: data.no_watermark },
          caption,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log("TIKTOK ERROR:", e);
      reply("❌ Error while downloading TikTok video");
    }
  }
);

