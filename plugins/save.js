const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "save",
    react: "💾",
    desc: "Save a replied photo or video to owner",
    category: "main",
    filename: __filename
},
async (conn, message, m, { quoted, reply }) => {

    try {

        if (!quoted) {
            return reply("❌ Please *reply* to a Photo or Video and type .save");
        }

        let mime = quoted.mimetype || "";

        if (!mime.includes("image") && !mime.includes("video")) {
            return reply("❌ This command works *only with Photo or Video* messages!");
        }

        // download the media
        let media = await quoted.download();
        let fileName = Date.now() + (mime.includes("image") ? ".jpg" : ".mp4");
        let filePath = path.join(__dirname, '../temp/' + fileName);

        fs.writeFileSync(filePath, media);

        // send to bot owner
        let ownerNumber = config.BOT_OWNER + "@s.whatsapp.net";

        await conn.sendMessage(ownerNumber, {
            document: fs.readFileSync(filePath),
            mimetype: mime,
            fileName: "SAVED_" + fileName,
            caption: `📥 Saved by: ${m.pushName || "Unknown"}`
        });

        fs.unlinkSync(filePath);

        reply("✅ Media saved and sent to the owner successfully!");

    } catch (e) {
        console.log(e);
        reply("❌ Failed to save media, please try again!");
    }
});
