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
            if (!isOwner) return reply
(`❌ Access Denied!
Only the bot owner can use this command.
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);

            if (!args[0]) {
                return reply(`╔═══◉ *⚙️ BOT MODE STATUS* ◉═══╗\n` +
                             `║  *Current Mode:* ${config.MODE.toUpperCase()}\n` +
                             `╚══════════════════════╝\n\n` +
                             `*Available Commands:*\n` +
                             `🔹 *.mode public* - Works in Owner chat, Groups & Inbox\n` +
                             `🔹 *.mode private* - Works in Owner chat only\n` +
                             `🔹 *.mode group* - Works in Owner chat & Groups\n` +
                             `╭━━━━━━━━━━━━━━━━━━━━✦\n` +
                             `┃🚀Pow. By\n` +
                             `╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
            }

            const targetMode = args[0].toLowerCase();

            if (targetMode === 'public' || targetMode === 'private' || targetMode === 'group') {
                config.MODE = targetMode;
                return reply
(`✅ Bot mode successfully updated to 
*${targetMode.toUpperCase()}*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
            } else {
                return reply
(`❌ Invalid mode! 
Please use: public, private, or group.
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
            }

        } catch (e) {
            console.error(e);
            return reply
(`❌ Error occurred while updating bot mode!
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }
    }
});
