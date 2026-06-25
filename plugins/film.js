const { commands, replyHandlers } = require("../command");
const puppeteer = require("puppeteer");

const pendingSearch = {};
const pendingQuality = {};

async function searchCinesubz(query) {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
  await page.goto(`https://cinesubz.co/?s=${encodeURIComponent(query)}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  
  const results = await page.$$eval("div.result-item article", articles =>
    articles.slice(0, 10).map((el, index) => ({
      id: index + 1,
      title: el.querySelector("div.title a")?.innerText.trim() || "Unknown",
      link: el.querySelector("div.title a")?.href || ""
    }))
  );
  await browser.close();
  return results;
}

commands.push({
  pattern: "cinesubz",
  alias: ["film"],
  react: "🎬",
  desc: "Search movies from Cinesubz (Puppeteer)",
  category: "download",
  function: async (rush, mek, m, { from, q, sender, reply }) => {
    if (!q) return reply("*Please provide a movie name!*");
    reply("⏳ *Searching... please wait a moment (Puppeteer is active).*");
    const results = await searchCinesubz(q);
    if (!results.length) return reply("*No movies found!*");
    
    pendingSearch[sender] = { results, timestamp: Date.now() };
    let msg = `╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮\n┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃\n┃━━━━━━━━━━━━━━━━━━━━✦\n┃✅ *𝗠𝗢𝗩𝗜𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 𝗥𝗘𝗦𝗨𝗟𝗧𝗦*\n┃━━━━━━━━━━━━━━━━━━━━✦\n`;
    results.forEach(r => msg += `╰➤👻 *${r.id}.* ${r.title}\n`);
    msg += `╭━━━━━━━━━━━━━━━━━━━━✦\n┃ℹ️ *Reply with number (1-${results.length})*\n┃🚀Pow. By\n╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;
    reply(msg);
  }
});

replyHandlers.push({
  filter: (text, { sender }) => pendingSearch[sender] && !isNaN(text),
  function: async (rush, mek, m, { body, sender, reply, from }) => {
    const idx = parseInt(body) - 1;
    const item = pendingSearch[sender].results[idx];
    if (!item) return;
    delete pendingSearch[sender];
    
    reply("⏳ *Fetching download links...*");
    const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(item.link, { waitUntil: "domcontentloaded" });
    
    const data = await page.evaluate(() => {
      const title = document.querySelector("h1")?.innerText;
      const links = Array.from(document.querySelectorAll("div.links_table table tr")).map(tr => ({
        quality: tr.querySelector("td")?.innerText.trim(),
        link: tr.querySelector("a")?.href
      })).filter(l => l.link);
      return { title, links };
    });
    await browser.close();
    
    pendingQuality[sender] = { movie: data, timestamp: Date.now() };
    let msg = `╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮\n┃✅ *${data.title}*\n┃━━━━━━━━━━━━━━━━━━━━✦\n`;
    data.links.forEach((l, i) => msg += `┃ *${i+1}.* ${l.quality}\n`);
    msg += `┃━━━━━━━━━━━━━━━━━━━━✦\n┃ℹ️ *Reply quality number*\n╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;
    reply(msg);
  }
});

replyHandlers.push({
  filter: (text, { sender }) => pendingQuality[sender] && !isNaN(text),
  function: async (rush, mek, m, { body, sender, reply, from }) => {
    const idx = parseInt(body) - 1;
    const link = pendingQuality[sender].movie.links[idx].link;
    const title = pendingQuality[sender].movie.title;
    delete pendingQuality[sender];
    
    reply(`*📥 Sending ${title}...*\nPlease wait.`);
    await rush.sendMessage(from, { document: { url: link }, mimetype: "video/mp4", fileName: `${title}.mp4`, caption: `*RUSH - TD Downloader*\n\n🚀 Powered By 𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔` }, { quoted: mek });
  }
});
