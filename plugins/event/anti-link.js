module.exports = {
   start: async (m, {
      conn,
      budy,
      Format,
      isAdmins,
      isOwner
   }) => {
      try {
         if (db.chats[m.chat].antilink && !m.fromMe && !m.isBaileys) {
            if (budy.includes('https://chat.whatsapp.com/')) {
               if (isAdmins) return m.reply('You have the authority to send the link as an admin.');
               if (isOwner) return m.reply('Sending the link is something you are free to do since you are my owner.');
               let sent = m.sender;
               conn.sendMessage(m.chat, {
                  text: `@${sent.split("@")[0]} Terdeteksi Mengirim Kata Kata Aneh!`,
                  contextInfo: {
                     mentionedJid: [sent]
                  }
               }, {
                  quoted: m
               });
               conn.sendMessage(m.chat, {
                  delete: {
                     remoteJid: m.chat,
                     fromMe: false,
                     id: m.key.id,
                     participant: sent
                  }
               })
               await Format.sleep(2000);
               await conn.groupParticipantsUpdate(m.chat, [sent], 'remove')
            }
         }
      } catch (e) {
         return false
      }
   }
};