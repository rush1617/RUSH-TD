const { cmd } = require("../command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

// 🖼️ SAVE View Once Image/Video Command
cmd(
{
    pattern: "save",
    react: "💾",
    desc: "Saves View Once image or video safely.",
    category: "media",
    filename: __filename,
},
async (rush, mek, m, { from, reply }) => {
    try {

        if (!m.quoted) {
            return reply("කරුණාකර *View Once Image* හෝ *Video* පණිවිඩයක් Reply කරන්න.");
        }

        const quotedMsg = m.quoted.msg;
        
        if (!quotedMsg) {
            return reply(`❌ Reply කළ පණිවිඩයේ දත්ත සොයා ගැනීමට නොහැක.`);
        }


        const isViewOnce = quotedMsg.viewOnce === true;

        if (!isViewOnce) {
            return reply(`මෙය *View Once* පණිවිඩයක් නොවේ. (Actual Type: ${m.quoted.type})`);
            }
        
        const actualMessageType = m.quoted.type;

        if (actualMessageType !== 'imageMessage' && actualMessageType !== 'videoMessage') {
            return reply("කරුණාකර *View Once Image* හෝ *Video* එකක් Reply කරන්න.");
        }

        reply("💾 View Once Media Download කරමින්...");
        await rush.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        const mediaType = actualMessageType === 'imageMessage' ? 'image' : 'video';
        const stream = await downloadContentFromMessage(quotedMsg, mediaType);
        
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (!buffer || buffer.length === 0) {
            return reply("❌ Media Download කිරීමට නොහැකි විය.");
        }


        const senderJid = m.quoted.sender;
        const captionText = `🖼️ *Saved View Once Media*\nSender: @${senderJid.split('@')[0]}`;
        
        const messageOptions = {
            [actualMessageType === 'imageMessage' ? 'image' : 'video']: buffer,
            caption: captionText,
            mentions: [senderJid]
        };

        await rush.sendMessage(from, messageOptions, { quoted: mek });
        await rush.sendMessage(from, { react: { text: '✅', key: mek.key } });

     }  catch (e) {
        console.error("Save Command Error:", e);
        reply(`*Error:* Save කිරීමේදී දෝෂයක් සිදුවිය: ${e.message}`);
    }
});
