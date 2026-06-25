const axios = require('axios');
const cheerio = require('cheerio');
const { commands, replyHandlers } = require('../command');

// තාවකාලිකව දත්ත ගබඩා කර තබා ගන්නා Objects
const pendingSearch = {};
const pendingQuality = {};

// පරණ දත්ත මැකීමට Auto Cleanup
setInterval(() => {
    const now = Date.now();
    const timeout = 10 * 60 * 1000; // විනාඩි 10යි
    for (const s in pendingSearch) if (now - pendingSearch[s].timestamp > timeout) delete pendingSearch[s];
    for (const s in pendingQuality) if (now - pendingQuality[s].timestamp > timeout) delete pendingQuality[s];
}, 5 * 60 * 1000);

// ==========================================
// පියවර 1: චිත්‍රපට සෙවීම (Search Command)
// ==========================================
commands.push({
    pattern: "cinesubz",
    alias: ["film", "movie"],
    react: "🎬",
    desc: "Search and download movies from Cinesubz.co",
    category: "download",
    function: async (rush, mek, m, { from, q, sender, reply }) => {
        if (!q) {
            return reply(`*Please provide a valid Movie name!* ❤️`);
        }


        try {
            const searchUrl = `https://cinesubz.co/?s=${encodeURIComponent(q)}`;
            const res = await axios.get(searchUrl);
            const $ = cheerio.load(res.data);

            const searchResults = [];
            $('div.result-item article').slice(0, 10).each((i, el) => {
                const title = $(el).find('div.title a').text().trim();
                const link = $(el).find('div.title a').attr('href');
                const year = $(el).find('span.year').text().trim();

                if (title && link) {
                    searchResults.push({ id: i + 1, title: `${title} (${year})`, link });
                }
            });

            if (searchResults.length === 0) return reply("*No movies found! Please check and try again.* ☹️");

            // සෙවූ දත්ත තාවකාලිකව ගබඩා කිරීම
            pendingSearch[sender] = { results: searchResults, timestamp: Date.now() };

            let textMsg = 
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃✅ *𝗠𝗢𝗩𝗜𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 𝗥𝗘𝗦𝗨𝗟𝗧𝗦*
┃━━━━━━━━━━━━━━━━━━━━✦\n`;
            
            searchResults.forEach((m) => {
                textMsg += `╰➤👻 *${m.id}.* ${m.title}\n`;
            });

            textMsg += 
`╭━━━━━━━━━━━━━━━━━━━━✦
┃ℹ️ *Reply with the movie number (1 - ${searchResults.length})*
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;

            await rush.sendMessage(from, { text: textMsg }, { quoted: mek });

        } catch (e) {
            console.error(e);
            reply(`*Error:* ${e.message || e}`);
        }
    }
});

// ==========================================
// පියවර 2: ෆිල්ම් එක තෝරාගැනීම හා විස්තර යැවීම
// ==========================================
replyHandlers.push({
    filter: (text, { sender }) => pendingSearch[sender] && !isNaN(text) && parseInt(text) > 0 && parseInt(text) <= pendingSearch[sender].results.length,
    function: async (rush, mek, m, { body, sender, reply, from }) => {
        await rush.sendMessage(from, { react: { text: "🎬", key: mek.key } });
        
        const index = parseInt(body.trim()) - 1;
        const selected = pendingSearch[sender].results[index];
        delete pendingSearch[sender]; 

        reply(`⏳ *Fetching details for ${selected.title}...*`);

        try {
            const res = await axios.get(selected.link);
            const $ = cheerio.load(res.data);

            const title = $('div.sheader div.data h1').text().trim() || selected.title;
            const imageUrl = $('div.sheader div.poster img').attr('src') || '';
            const duration = $('div.sheader div.data div.extra span.runtime').text().trim() || 'N/A';
            const releaseDate = $('div.sheader div.data div.extra span.date').text().trim() || 'N/A';
            
            // Download links ලබා ගැනීම
            const downloadLinks = [];
            $('div#download div.links_table table tbody tr').each((i, el) => {
                const quality = $(el).find('td').eq(1).text().trim() || $(el).find('td').eq(0).text().trim();
                const link = $(el).find('td').eq(3).find('a').attr('href') || $(el).find('a.download-button').attr('href');
                if (quality && link) {
                    downloadLinks.push({ id: downloadLinks.length + 1, quality, link });
                }
            });

            if (downloadLinks.length === 0) return reply("*No download links available for this movie!* ☹️");

            // දත්ත ගබඩා කිරීම
            pendingQuality[sender] = { 
                movie: { title, imageUrl, links: downloadLinks }, 
                timestamp: Date.now() 
            };

            let infoMsg = 
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃✅ *𝗠𝗢𝗩𝗜𝗘 𝗗𝗘𝗧𝗔𝗜𝗟𝗦*
┃━━━━━━━━━━━━━━━━━━━━✦
╰➤👻 *Title:* ${title}
╰➤👻 *Release:* ${releaseDate}
╰➤👻 *Duration:* ${duration}
╭━━━━━━━━━━━━━━━━━━━━✦
┃📥 *Available Qualities:*\n`;

            downloadLinks.forEach((d) => {
                infoMsg += `┃ *${d.id}.* ${d.quality}\n`;
            });

            infoMsg += 
`┃━━━━━━━━━━━━━━━━━━━━✦
┃ℹ️ *Reply with the quality number (1 - ${downloadLinks.length})*
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;

            if (imageUrl) {
                await rush.sendMessage(from, { image: { url: imageUrl }, caption: infoMsg }, { quoted: mek });
            } else {
                await rush.sendMessage(from, { text: infoMsg }, { quoted: mek });
            }

        } catch (e) {
            console.error(e);
            reply(`*Error:* Failed to fetch movie details. ☹️`);
        }
    }
});

// ==========================================
// පියවර 3: Quality තෝරාගෙන Download කිරීම
// ==========================================
replyHandlers.push({
    filter: (text, { sender }) => pendingQuality[sender] && !isNaN(text) && parseInt(text) > 0 && parseInt(text) <= pendingQuality[sender].movie.links.length,
    function: async (rush, mek, m, { body, sender, reply, from }) => {
        await rush.sendMessage(from, { react: { text: "⬇️", key: mek.key } });
        
        const index = parseInt(body.trim()) - 1;
        const { movie } = pendingQuality[sender];
        const selectedLink = movie.links[index];
        
        delete pendingQuality[sender]; 

        reply(`*📥 Sending ${movie.title} (${selectedLink.quality})...*\nPlease wait, this may take a few minutes.`);

        try {
            const captionDesc = 
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃✅ *𝗠𝗢𝗩𝗜𝗘 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*
┃━━━━━━━━━━━━━━━━━━━━✦
╰➤👻 *Title:* ${movie.title}
╰➤👻 *Quality:* ${selectedLink.quality}
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;

            // Document ආකාරයෙන් ෆයිල් එක යැවීම
            await rush.sendMessage(from, {
                document: { url: selectedLink.link },
                mimetype: "video/mp4",
                fileName: `RUSH-TD_${movie.title}_${selectedLink.quality}.mp4`.replace(/[^\w\s.-]/gi, ''),
                caption: captionDesc
            }, { quoted: mek });
            
            await rush.sendMessage(from, { react: { text: "✅", key: mek.key } });
            return reply("✅ *Thank you for using RUSH - TD!* 💖");

        } catch (error) {
            console.error("[DOWNLOAD ERROR]", error);
            reply(`*Error:* Failed to send the movie. ☹️`);
        }
    }
});
