const fetch = require('node-fetch');
exports.default = {
   names: ['AI'],
   tags: ['gemini'],
   command: ['gemini', 'bard'],
   start: async (m, {
      conn,
      text,
      prefix,
      command,
      Format
   }) => {
      if (!text) return m.reply(`contoh ${prefix+command} apa kabar?`);
      m.react('🕒');
      const result = await (await fetch('https://bk9.fun/ai/gemini?q=' + text)).json();      
         
         conn.adReply(m.chat, `${result.BK9}`, "https://s.yimg.com/ny/api/res/1.2/vg49Jkpq4FAtqz3zUahC0w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/5f7be670-943f-11ee-af7f-41b7060d20ba", m, {
            showAds: false
         })
      
   },
   limit: 0,
   register: false
}