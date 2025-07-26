const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: "OU8lkYIA#GSSsDqu8Dqesv0fcbT2qNiULyWZ4Z49NjJ1gURWz4Fo", // Put your session id here
  ALIVE_IMG: "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true",
  ALIVE_MSG: "*Hello👋 RUSH-TD Is Alive Now😍*", // Change alive msg from here
  BOT_OWNER: "94726892483", // Replace your bot owner number here with 94(country code)
  ownerNumber: ["94726892483"], // Replace your bot owner number here (same as bot owner number)


    };
