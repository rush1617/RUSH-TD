const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: "XQ9g2SAA#vSDwTMA7JI1a4-ljf21pjHJwWW4EfgADDzkpOL6Qb3w", // Put your session id here
  ALIVE_IMG: "https://github.com/rush1617/RUSH-TD/blob/main/images/Rush-TD%20(1).png",
  ALIVE_MSG: "*Hello👋 RUSH-TD Is Alive Now😍*", // Change alive msg from here
  BOT_OWNER: "94726892483", // Replace your bot owner number here with 94(country code)
  ownerNumber: ["94726892483"], // Replace your bot owner number here (same as bot owner number)


    };
