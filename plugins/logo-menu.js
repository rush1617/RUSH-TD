const { cmd } = require("../command");

cmd(
  {
    pattern: "logo",
    react: "📥",
    filename: __filename,
  },
  async (rush, mek, m, { from, reply }) => {
    try {
      const downloadText = 
`╭━━━ ⚡ *RUSH-TD* ⚡ ━━━╮
┃  💠 𝗟𝗢𝗚𝗢 - 𝗠𝗘𝗡𝗨               ┃
┃━━━━━━━━━━━━━━━━━✦
╰➤🎨*Naruto* - Type: .naruto
╰➤🎨*Dragonball* - Type: .dragonball
╰➤🎨*Onepiece* - Type: .onepiece
╰➤🎨*3DComic* - Type: .3dcomic
╰➤🎨*Marvel* - Type: .marvel
╰➤🎨*Deadpool* - Type: .deadpool
╰➤🎨*Blackpink* - Type: .blackpink
╰➤🎨*HarryPotter* - Type: .harrypotter
╰➤🎨*Neon* - Type: .neon
╰➤🎨*Glitch* - Type: .glitch
╰➤🎨*Rainbow* - Type: .rainbow
╰➤🎨*Glass* - Type: .glass
╰➤🎨*Frosted Glass* - Type: .frostedglass
╰➤🎨*Neon Glass* - Type: .neonglass
╰➤🎨*Gold* - Type: .gold
╰➤🎨*Silver* - Type: .silver
╰➤🎨*Diamond* - Type: .diamond
╰➤🎨*Fire* - Type: .fire
╰➤🎨*Water* - Type: .water
╰➤🎨*Smoke* - Type: .smoke
╰➤🎨*Ice* - Type: .ice
╰➤🎨*Crystal* - Type: .crystal
╰➤🎨*Luxury* - Type: .luxury
╰➤🎨*Modern* - Type: .modern
╰➤🎨*Christmas* - Type: .christmas
╰➤🎨*Halloween* - Type: .halloween
╰➤🎨*Graffiti* - Type: .graffiti
╰➤🎨*Sand* - Type: .sand
╰➤🎨*Sky* - Type: .sky
╰➤🎨*Space* - Type: .space
╭━━━━━━━━━━━━━━━━━✦
┃  📥Made with ❤️ by
╰─🔥 *RAMESH DISSANAYAKA* 🔥`.trim();

      // Photo eke path eka / url eka denna
      const imageUrl = "https://github.com/rush1617/RUSH-TD/blob/main/images/Alive.png?raw=true"; // <-- Replace with your image URL

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
