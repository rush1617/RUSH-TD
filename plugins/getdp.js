const { cmd } = require("../command");

// 🖼️ GET Profile Picture (DP) Command
cmd(
{
    pattern: "getdp",
    alias: ["dp", "getprofile"],
    react: "📸",
    desc: "Get the profile picture of replied, mentioned user, group, or DM.",
    category: "media",
    filename: __filename,
},
async (rush, mek, m, { from, q, reply, isGroup, sender, mentionedJid, args }) => {
    try {
        let targetJid;
        
        // 1. Determine Target JID
        if (mentionedJid && mentionedJid.length > 0) {
            // If mentioned
            targetJid = mentionedJid[0];
        } else if (m.quoted) {
            // If replied
            targetJid = m.quoted.sender;
        } else if (isGroup && (q === 'group' || q === 'g')) {
            // If '.getdp group' is used, fetch Group DP
            targetJid = from;
        } else if (!isGroup && !q) {
            // In Personal Chat without arguments (Chat Partner)
            targetJid = from; 
        } else if (isGroup && !q) {
             // In Group without arguments, fetch sender's DP
             targetJid = sender;
        } else if (args.length > 0 && !isNaN(args[0])) {
            // If a number is provided directly
            targetJid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        } else {
             return reply(
`*Please: 1. Mention a user, 2. Reply to a message, or 3. Provide a number (.getdp 94xxxxxxxxx)*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }
        
        if (!targetJid) {
             return reply(
`*⚠️ Failed to determine the Target JID.*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }
        
        await rush.sendMessage(from, { react: { text: "📸", key: mek.key } });

        // 2. Get Profile Picture URL
        let profilePictureUrl;
        try {
            profilePictureUrl = await rush.profilePictureUrl(targetJid, 'image');
        } catch (err) {
            return reply(
`*❌ Could not find ${targetJid.split('@')[0]}'s DP or it is set to Private.*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }

        if (!profilePictureUrl) {
            return reply(
`*❌ Could not find a DP for ${targetJid.split('@')[0]}.*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
        }
        
        // 3. Resend the Image
        const captionText = 
`*✅ ${targetJid.includes('@g.us') ? 'Group' : targetJid.split('@')[0]}'s Profile Picture.*
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`;

        await rush.sendMessage(from, {
            image: { url: profilePictureUrl },
            caption: captionText,
            mentions: targetJid.includes('@g.us') ? [] : [targetJid]
        }, { quoted: mek });

        await rush.sendMessage(from, { react: { text: '📸', key: mek.key } });

    } catch (e) {
        console.error("--- GETDP ERROR ---", e);
        reply(
`*🚨 Error:* ${e.message || e}. Failed to get the DP.
╭━━━━━━━━━━━━━━━━━━━━✦
┃🚀Pow. By
╰━🔥𝗥𝗔𝗠𝗘𝗦𝗛 𝗗𝗜𝗦𝗦𝗔𝗡𝗔𝗬𝗔𝗞𝗔🔥`);
    }
});
