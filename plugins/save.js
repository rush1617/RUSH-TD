const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'save',
    category: 'owner',
    desc: 'Saves view once media',
    async execute(m, conn) {
        // Checking if it's a View Once message
        const quoted = m.quoted ? m.quoted : m;
        const viewOnce = quoted.mtype === 'viewOnceMessageV2' || quoted.mtype === 'viewOnceMessage';

        if (!viewOnce) {
            return m.reply("Please reply to a **View Once** message.");
        }

        try {
            const type = Object.keys(quoted.message)[0];
            const media = await downloadContentFromMessage(
                quoted.message[type].message[Object.keys(quoted.message[type].message)[0]], 
                type.replace('Message', '')
            );
            
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            // Sending the media back
            if (/image/.test(type)) {
                await conn.sendMessage(m.chat, { image: buffer, caption: '> Saved by RUSH-TD' }, { quoted: m });
            } else if (/video/.test(type)) {
                await conn.sendMessage(m.chat, { video: buffer, caption: '> Saved by RUSH-TD' }, { quoted: m });
            }

            // Adding reaction ONLY to your command message
            await conn.sendMessage(m.chat, { 
                react: { 
                    text: "💾", 
                    key: m.key // This targets the message you sent (.save)
                } 
            });

        } catch (e) {
            console.error(e);
            m.reply("Error: Failed to download media.");
            await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        }
    }
};
