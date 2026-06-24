const { cmd } = require("../command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

// 🖼️ SAVE View Once Image/Video Command
cmd(
{
    pattern: "save",
     alias: ["save", "sv"],
    react: "💾",
    desc: "Saves View Once image or video safely.",
    category: "media",
    filename: __filename,
},
async (rush, mek, m, { from, reply }) => {
    try {

        if (!m.quoted) {
            return reply
(`Please Reply to a *View Once Image* or *Video* Message.
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }

        const quotedMsg = m.quoted.msg;
        
        if (!quotedMsg) {
            return reply
(`❌ Unable to Find Data in the Replied Message.
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }


        const isViewOnce = quotedMsg.viewOnce === true;

        if (!isViewOnce) {
            return reply
(`This is not a *View Once* Message. (Actual Type: ${m.quoted.type})
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
            }
        
        const actualMessageType = m.quoted.type;

        if (actualMessageType !== 'imageMessage' && actualMessageType !== 'videoMessage') {
            return reply
(`Please Reply with a *View Once Image* or *Video*.
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }

        reply
(`💾 View Once Media Downloading...
 ╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        await rush.sendMessage(from, { react: { text: "💾", key: mek.key } });

        const mediaType = actualMessageType === 'imageMessage' ? 'image' : 'video';
        const stream = await downloadContentFromMessage(quotedMsg, mediaType);
        
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (!buffer || buffer.length === 0) {
            return reply
(`❌ Unable to Download Media
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }


        const senderJid = m.quoted.sender;
        const captionText = 
`🖼️ *Saved View Once Media*\nSender: @${senderJid.split('@')[0]}
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;
        
        const messageOptions = {
            [actualMessageType === 'imageMessage' ? 'image' : 'video']: buffer,
            caption: captionText,
            mentions: [senderJid]
        };

        await rush.sendMessage(from, messageOptions, { quoted: mek });
        await rush.sendMessage(from, { react: { text: '💾', key: mek.key } });
}

    return reply("✅ *Thank you for using RUSH-TD! Enjoy* 💖");
     }  catch (e) {
        console.error("Save Command Error:", e);
        reply
(`*Error:* An Error occurred While Saving: ${e.message}
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
    }
});
