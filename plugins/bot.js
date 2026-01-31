const { cmd } = require("../command");

cmd(
  {
    pattern: "bot",
    react: " 🤖",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const downloadText = 
`╔══◉ 🟢 STATUS: ONLINE ◉══╗\n` +
`║  𝙷𝚎𝚢 𝙳𝚞𝚍𝚎, 𝙸’𝚖 𝚑𝚎𝚛𝚎 𝚝𝚘 𝚑𝚎𝚕𝚙 𝚢𝚘𝚞. \n` +
`║  𝙰𝚜𝚔 𝚖𝚎 𝚊𝚗𝚢𝚝𝚑𝚒𝚗𝚐! 💬\n` +
`╚════════════════════╝\n` +
`🧾 PROFILE INFORMATION\n` +
`┌──────── ⋆⋅☆⋅⋆ ────────┐\n` +
`│ 🔐 Owner: Ramesh Dissanayaka\n` +
`│ 👤 Botname: RUSH-TD\n` +
`│ ⚡ Bio: Powerful WhatsApp Bot\n` +
`│ 🧩 Role: Wizard Lord 🧙‍♂️ \n` +
`└──────── ⋆⋅☆⋅⋆ ────────┘\n` +
`🚀 Powered By\n` +
`RAMESH DISSANAYAKA 🔥\n`.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/RUSH-TD%201.png?raw=true"; // <-- Replace with your image URL

      await rush.sendMessage(from, {
        image: { url: imageUrl },
        caption: downloadText,
      }, { quoted: mek });

    } catch (err) {
      console.error(err);
      reply("❌ Error generating download.");
    }
  }
);
