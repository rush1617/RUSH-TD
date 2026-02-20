const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "save",
    react: "💾",
    desc: "Save replied photo or video",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {

    try {

        if (!quoted) return reply("❌ Reply to a Photo or Video and type .save");

        let mime = quoted.mimetype || "";

        if (!mime.startsWith("image") && !mime.startsWith("video")) {
            return reply("❌ This command only works with Photo or Video messages!");
        }

        let media = await quoted.download();

        let filePath = path.join(__dirname, '../temp/' + Date.now());

        fs.writeFileSync(filePath, media);

        let ownerJid = config.BOT_OWNER + "@s.whatsapp.net";

        await conn.sendMessage(ownerJid, {
            document: fs.readFileSync(filePath),
            mimetype: mime,
            fileName: "RUSH_SAVE_" + Date.now(),
            caption: "📥 *New Media Saved*\n\nFrom: " + m.pushName
        });

        fs.unlinkSync(filePath);

        reply("✅ Media has been successfully saved to the owner number!");

    } catch (e) {
        console.log(e);
        reply("❌ An error occurred while saving the media!");
    }

});
