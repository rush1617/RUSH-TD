
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

      const caption =
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃🎧 *𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥* 🎧
┃━━━━━━━━━━━━━━━━━━━━✦
┃🎼 Let the rhythm guide you... 🎼
┃🚀 Pow. By RAMESH DISSANAYAKA 🔥
┃━━━━━━━━━━━━━━━━━━━━✦
╰➤🎬 *${video.title}*
╰➤👤 *Channel:* ${video.author.name}
╰➤⏱ *Duration:* ${video.timestamp}
╰➤👀 *Views:* ${video.views.toLocaleString()}
╰➤🔗 ${video.url}
╭━━━━━━━━━━━━━━━━━━━━✦
┃🎼Made with ❤️ by
╰━𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔💫`;

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
          audio: { url: data.url },
          mimetype: "audio/mpeg",
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
    alias: ["yt"],
    react: "📼",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename,
  },
  async (rush, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("🎬 Send video name or YouTube link");

      const video = await getYoutube(q);
      if (!video) return reply("❌ No results found");

      const caption =
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃📼 *𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥* 📼
┃━━━━━━━━━━━━━━━━━━━━✦
┃📼 Let the video guide you... 📼
┃🚀 Pow. By RAMESH DISSANAYAKA 🔥
┃━━━━━━━━━━━━━━━━━━━━✦
╰➤🎬 *${video.title}*
╰➤👤 *Channel:* ${video.author.name}
╰➤⏱ *Duration:* ${video.timestamp}
╰➤📅 *Uploaded:* ${video.ago}
╰➤👀 *Views:* ${video.views.toLocaleString()}
╰➤🔗 ${video.url}
╭━━━━━━━━━━━━━━━━━━━━✦
┃📼Made with ❤️ by
╰━𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔💫`;

      await rush.sendMessage(
        from,
        {
          image: { url: video.thumbnail },
          caption,
        },
        { quoted: mek }
      );


      const data = await ytmp4(video.url, {
        format: "mp4",
        videoQuality: "720",
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
       return reply("✅ *Thank you for using RUSH-TD! Enjoy your video* 💖");
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
    react: "🎱",
    desc: "Download TikTok video",
    category: "download",
    filename: __filename,
  },
  async (rush, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("📱 Send TikTok link");


      const data = await tiktok(q);
      if (!data?.no_watermark)
        return reply("❌ Failed to download TikTok video");

      const caption = 
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃🎱 *𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥* 🎱
┃━━━━━━━━━━━━━━━━━━━━✦
┃🎱Let the video guide you... 🎱
┃🚀 Pow. By RAMESH DISSANAYAKA 🔥
┃━━━━━━━━━━━━━━━━━━━━✦
╰➤🎵 *${data.title || "TikTok Video"}*
╰➤👤 *Author:* ${data.author || "Unknown"}
╰➤⏱ *Duration:* ${data.runtime}
╭━━━━━━━━━━━━━━━━━━━━✦
┃🎱Made with ❤️ by
╰━𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔💫`;

      await rush.sendMessage(
        from,
        {
          video: { url: data.no_watermark },
          caption,
        },
        { quoted: mek }
      );
       return reply("✅ *Thank you for using RUSH-TD! Enjoy your video* 💖");
    } catch (e) {
      console.log("TIKTOK ERROR:", e);
      reply("❌ Error while downloading TikTok video");
    }
  }
);

