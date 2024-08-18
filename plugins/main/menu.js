const fetch = require('node-fetch');
exports.default = {
 

   command: ['menu', 'help', 'قائمة', 'مساعدة', 'كل_القوائم', 'أمر', 'م', 'الكل', 'مني'],
   start: async (m, {
      conn,
      prefix,
      command,
      Format
   }) => {
      let sosmed = `${setting.sosmed}`;
      let jembut = ` ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ ͝ ꒷ ͝ ꒦ `; // تزيين علوي
      let garis = ` ══════════════════`;
      let { Upload, Download } = await Format.statistic();
      let title = `${setting.footer}`;
    
      let lolim = logo_limit || 'Ⓛ';
      let loprem = logo_premium || 'Ⓟ';
      let header = `┌───`;
      let middle = `│`;
      let pointer = `⭓`;
      let bottom = `└───────────⭓` + '\n';
      let left = `『`;
      let right = `』`;    
      let bigHeader = false;
      let top = { left, right, bigHeader };
      let info = `${garis}\n`;
      info += `مرحبا  @${m.sender.split('@')[0]} \n`;
      info += `📝 إجمالي استخدام الأوامر\n ‎ ‎ ‎ ‎ ‎ ‎ بوتك: ${db.users[m.sender].hitCmd} مرة\n${garis}\n`;
      info += ``;
      m.react('🇲🇦');
      let { menu } = await Format.Plugins(header, middle, pointer, bottom, prefix, top);
      let picture = await conn.profilePictureUrl(m.sender, 'image').catch(_ => setting.thumbnail);
      conn.adReply(m.chat, `${info}\n\n${menu}`, picture, m, {
         showAds: true
      });
      conn.sendFile(m.chat, {
         
         
         quoted: m,
         contextInfo: {
            externalAdReply: {
               mediaType: 1,
               title: 'قائمتك :)',
               sourceUrl: setting.group.link,
               thumbnail: await (await fetch(picture)).buffer()
            }
         }
      });
   }
};
