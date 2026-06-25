const axios = require('axios');
const cheerio = require('cheerio');
const { commands, replyHandlers } = require('../command');

const pendingSearch = {};
const pendingQuality = {};

setInterval(() => {
    const now = Date.now();
    const timeout = 10 * 60 * 1000; 
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

        reply("⏳ *Searching for movies on Cinesubz...*");

        try {
            // Cinesubz හි ප්‍රධාන ඩොමේන් එක භාවිතය සහ User-Agent යාවත්කාලීන කිරීම
            const searchUrl = `https://cinesubz.co/?s=${encodeURIComponent(q)}`;
            const res = await axios.get(searchUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.9'
                }
            });
            const $ = cheerio.load(res.data);

            // Cloudflare ආරක්ෂාව මඟින් බොට්ව අවහිර කර ඇත්දැයි පරීක්ෂා කිරීම
            const pageTitle = $('title').text();
            if (pageTitle.includes('Just a moment') || pageTitle.includes('Cloudflare')) {
                return reply("⚠️ *Cloudflare Security is blocking the bot!* \n\nඔබගේ Bot Host කර ඇති Server එකේ IP එක Cinesubz අඩවියෙන් Block කර ඇත (Verification එකක් ඉල්ලනවා). මේ නිසා වෙබ් අඩවියට ඇතුළු විය නොහැක. ☹️");
            }

            const searchResults = [];
            
            // වඩාත් පුළුල්ව සෙවුම් ප්‍රතිඵල ලබාගැනීම
            $('.result-item, article.item, article.post').each((i, el) => {
                const title = $(el).find('.title a, h2 a, h3 a').text().trim() || $(el).find('img').attr('alt');
                const link = $(el).find('.title a, h2 a, h3 a, a').attr('href');
                
                if (title && link && link.includes('cinesubz')) {
                    // එකම ෆිල්ම් එක දෙවරක් ඇතුළත් වීම වැළැක්වීම
                    if (!searchResults.some(m => m.link === link)) {
                        searchResults.push({ id: searchResults.length + 1, title: title, link: link });
                    }
                }
            });

            // ප්‍රතිඵල 10කට සීමා කිරීම
            const limitedResults = searchResults.slice(0, 10);

            if (limitedResults.length === 0) return reply("*No movies found! Please check and try again.* ☹️");

            // සෙවූ දත්ත තාවකාලිකව ගබඩා කිරීම
            pendingSearch[sender] = { results: limitedResults, timestamp: Date.now() };

            let textMsg = 
`╭━━━🌟𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢🌟━━━╮
┃            ®️ *𝗥𝗨𝗦𝗛 -𝗧𝗗* ®️               ┃
┃━━━━━━━━━━━━━━━━━━━━✦
┃✅ *𝗠𝗢𝗩𝗜𝗘 𝗦𝗘𝗔𝗥𝗖𝗛 𝗥𝗘𝗦𝗨𝗟𝗧𝗦*
┃━━━━━━━━━━━━━━━━━━━━✦\n`;
            
            limitedResults.forEach((m) => {
                textMsg += `╰➤👻 *${m.id}.* ${m.title}\n`;
            });

            textMsg += 
`╭━━━━━━━━━━━━━━━━━━━━✦
┃ℹ️ *Reply with the movie number (1 - ${limitedResults.length})*
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;

            await rush.sendMessage(from, { text: textMsg }, { quoted: mek });

        } catch (e) {
            console.error(e);
            if (e.response && e.response.status === 403) {
                reply(`⚠️ *Access Denied (403)!* \nCinesubz අඩවියෙන් ඔබගේ බොට්ව Block කර ඇත. ☹️`);
            } else {
                reply(`*Error:* ${e.message || e}`);
            }
        }
    }
});

// ==========================================
// පියවර 2: ෆිල්ම් එක තෝරාගැනීම හා විස්තර යැවීම
// ==========================================
replyHandlers.push({
    filter: (text, { sender }) => pendingSearch[sender] && !isNaN(text) && parseInt(text) > 0 && parseInt(text) <= pendingSearch[sender].results.length,
    function: async (rush, mek, m, { body, sender, reply, from }) => {
        await rush.sendMessage(from, { react: { text: "✅", key: mek.key } });
        
        const index = parseInt(body.trim()) - 1;
        const selected = pendingSearch[sender].results[index];
        delete pendingSearch[sender]; 

        reply(`⏳ *Fetching details for ${selected.title}...*`);

        try {
            const res = await axios.get(selected.link, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
            });
            const $ = cheerio.load(res.data);

            const title = $('div.sheader div.data h1').text().trim() || selected.title;
            const imageUrl = $('div.sheader div.poster img').attr('src') || '';
            const duration = $('div.sheader div.data div.extra span.runtime').text().trim() || 'N/A';
            const releaseDate = $('div.sheader div.data div.extra span.date').text().trim() || 'N/A';
            
            const downloadLinks = [];
            $('div#download div.links_table table tbody tr').each((i, el) => {
                const quality = $(el).find('td').eq(1).text().trim() || $(el).find('td').eq(0).text().trim();
                const link = $(el).find('td').eq(3).find('a').attr('href') || $(el).find('a.download-button').attr('href');
                if (quality && link) {
                    downloadLinks.push({ id: downloadLinks.length + 1, quality, link });
                }
            });

            if (downloadLinks.length === 0) return reply("*No download links available for this movie!* ☹️");

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
