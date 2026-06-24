const config = require('../config');
const { commands } = require('../command');

commands.push({
    pattern: "mode",
    alias: ["setmode", "worktype"],
    react: "🎭",
    desc: "Change the bot working mode dynamically.",
    category: "owner",
    function: async (rush, mek, m, { from, isOwner, args, reply }) => {
        try {
            // Mode වෙනස් කිරීම Owner ට පමණක් සීමා කිරීම
            if (!isOwner) return reply("❌ Access Denied! Only the bot owner can use this command.");

            // Command එක සමඟ අගයක් ලබා දී නැතිනම්
            if (!args[0]) {
                return reply(`╔═══◉ *⚙️ BOT MODE STATUS* ◉═══╗\n` +
                             `║  *Current Mode:* ${config.MODE.toUpperCase()}\n` +
                             `╚══════════════════════╝\n\n` +
                             `*Available Commands:*\n` +
                             `🔹 *.mode public* - Works in Owner chat, Groups & Inbox\n` +
                             `🔹 *.mode private* - Works in Owner chat only\n` +
                             `🔹 *.mode group* - Works in Owner chat & Groups`);
            }

            const targetMode = args[0].toLowerCase();

            if (targetMode === 'public' || targetMode === 'private' || targetMode === 'group') {
                config.MODE = targetMode;
                return reply(`✅ Bot mode successfully updated to *${targetMode.toUpperCase()}*`);
            } else {
                return reply("❌ Invalid mode! Please use: public, private, or group.");
            }

        } catch (e) {
            console.error(e);
            return reply("❌ Error occurred while updating bot mode!");
        }
    }
});
