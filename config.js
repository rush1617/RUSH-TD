const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: "uI9g0KpI#NHhquTCzmYiHkPl0BGm6H8vEzEvvw4zIvSLK-cF0sHI", // Put your session id here
  ALIVE_IMG: "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true",
  ALIVE_MSG: `╔═══◉ *🟢 STATUS: ONLINE* ◉═══╗\n` +
`║  𝙷𝚎𝚢 𝙳𝚞𝚍𝚎, 𝙸’𝚖 𝚑𝚎𝚛𝚎 𝚝𝚘 𝚑𝚎𝚕𝚙 𝚢𝚘𝚞. \n` +
`║  𝙰𝚜𝚔 𝚖𝚎 𝚊𝚗𝚢𝚝𝚑𝚒𝚗𝚐! 💬\n` +
`╚══════════════════════╝\n` +

`🧾 *PROFILE INFORMATION*\n` +
`┌──────── ⋆⋅☆⋅⋆ ────────┐\n` +
`│ 🔐 *Owner:* Ramesh Dissanayaka\n` + 
`│ 👤 *Botname:* RUSH-TD\n` + 
`│ ⚡ *Bio:* Powerful WhatsApp Bot\n` + 
`│ 🧩 *Role:* Wizard Lord 🧙‍♂️ \n` +
`└──────── ⋆⋅☆⋅⋆ ────────┘\n` +

`🚀 Powered By *RAMESH*
*DISSANAYAKA* 🔥\n`, // Change alive msg from here
  BOT_OWNER: "94775938007", // Replace your bot owner number here with 94(country code)
  AUTO_STATUS_SEEN: 'true',
  AUTO_STATUS_REACT: 'true',
MODE: process.env.MODE || "public", //public,private,group

};
