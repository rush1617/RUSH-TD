const { getContentType } = require('@whiskeysockets/baileys');

const savePlugin = async (msg, { sendMessage }) => {
  if (msg.body.startsWith('.save')) {
    const content = await msg.download();
    if (!content) return;

    const type = getContentType(msg.message);
    const mediaType = type.replace('Message', '');

    // Save logic here (e.g., save to local storage or cloud)
    console.log(`Saving ${mediaType}...`);
    // Example: writeFileSync(`./saved/${Date.now()}.${mediaType}`, content);
  }
};

module.exports = savePlugin;
