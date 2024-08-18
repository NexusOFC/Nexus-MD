exports.default = {
   names: ['AI'],
   tags: ['gpt'],
   command: ['ai', 'gpt'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕒');
      const result = await Format.GPT(text)
       
         conn.adReply(m.chat, `${result}`, cover, m, {
            showAds: false
         });
      
   },
  
   
}