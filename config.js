const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: "OU8lkYIA#GSSsDqu8Dqesv0fcbT2qNiULyWZ4Z49NjJ1gURWz4Fo", // Put your session id here
  ALIVE_IMG: "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true",
  ALIVE_MSG: `╔═══◉ *🟢 STATUS: ONLINE* ◉═══╗
║  𝙷𝚎𝚢 𝙳𝚞𝚍𝚎, 𝙸’𝚖 𝚑𝚎𝚛𝚎 𝚝𝚘 𝚑𝚎𝚕𝚙 𝚢𝚘𝚞.  
║  𝙰𝚜𝚔 𝚖𝚎 𝚊𝚗𝚢𝚝𝚑𝚒𝚗𝚐! 💬
╚══════════════════════╝

🧾 *PROFILE INFORMATION*
┌──────── ⋆⋅☆⋅⋆ ────────┐
│ 🔐 *Owner:* Ramesh Dissanayaka  
│ 👤 *Botname:* RUSH-TD  
│ ⚡ *Bio:* Powerful WhatsApp Bot  
│ 🧩 *Role:* Wizard Lord 🧙‍♂️  
└──────── ⋆⋅☆⋅⋆ ────────┘

🚀 Powered By *RAMESH*
*DISSANAYAKA* 🔥`, // Change alive msg from here
  BOT_OWNER: "94726892483", // Replace your bot owner number here with 94(country code)
  ownerNumber: ["94726892483"], // Replace your bot owner number here (same as bot owner number)


    };
