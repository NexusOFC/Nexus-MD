const { igdl } = require('ruhend-scraper');
module.exports = {
   start: async (m, {
      conn,
      budy
   }) => {
      if (autodl && /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s/]+(?:\/videos\/\d+\/?)?/.test(budy)) {
         if (budy.includes('.fb')) return;
         if (budy.match(/\.facebook\s/)) return;
         if (m.isBaileys) return;
         if (db.users[m.sender].limit < 0) return m.reply(mess.limit);
         m.react('🕒');
         let res = await igdl(budy);         
         let data = res.data;
         for (let video of data) {
            conn.sendFile(m.chat, video.url, {
               quoted: m
            });
         }
         db.users[m.sender].limit -= 0
      }
   }
}
