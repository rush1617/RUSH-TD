const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: "fNEmAKoB#mb_Z_WAI4bZ5yRoXADwC73UDzcQdsCMBRiC7CDYOhe8", // Put your session id here
  ALIVE_IMG: "https://github.com/rush1617/RUSH-TD/blob/main/images/Rush-TD%20(1).png?raw=true",
  ALIVE_MSG: "*Hello👋 RUSH-TD Is Alive Now😍*", // Change alive msg from here
  BOT_OWNER: "94726892483", // Replace your bot owner number here with 94(country code)
  ownerNumber: ["94726892483"], // Replace your bot owner number here (same as bot owner number)


    };
