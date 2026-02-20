const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
    pattern: 'save',
    alias: ['getvo', 'sv'],
    react: '💾',
    category: 'owner',
    desc: 'Downloads and saves View Once media',
    async run(m, { conn }) {
        // Checking for a quoted message
        const q = m.quoted ? m.quoted : m;
        
        // Checking if the message type is View Once
        const isViewOnce = q.mtype === 'viewOnceMessageV2' || q.mtype === 'viewOnceMessage' || q.msg?.viewOnce;

        if (!isViewOnce) {
            return m.reply("Please reply to a **View Once** message.");
        }

        try {
            // Identify the media type (image or video)
            const msg = q.mtype === 'viewOnceMessageV2' ? q.message.viewOnceMessageV2.message : q.message.viewOnceMessage.message;
            const type = Object.keys(msg)[0];
            
            // Downloading the media content
            const stream = await downloadContentFromMessage(msg[type], type.replace('Message', ''));
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            // Sending the media back to the chat
            if (/image/.test(type)) {
                await conn.sendMessage(m.chat, { image: buffer, caption: '> Saved by RUSH-TD' }, { quoted: m });
            } else if (/video/.test(type)) {
                await conn.sendMessage(m.chat, { video: buffer, caption: '> Saved by RUSH-TD' }, { quoted: m });
            }


        } catch (e) {
            console.error(e);
            m.reply("Error: Failed to process the View Once media.");
            await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        }
    }
};
