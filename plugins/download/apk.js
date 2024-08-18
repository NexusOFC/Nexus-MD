
const axios = require('axios');

exports.default = {
   names: ['Downloader'],
   tags: ['apk'],
   command: ['apk', 'apkdl'],
   start: async (m, { conn, text, prefix, command }) => {
      if (!text) return m.reply(`يرجى إدخال اسم التطبيق بعد الخاصية\nمثال:\n ${prefix + command} free fire`);
      if (m.isBaileys) return;

      try {
         let apiUrl = `https://ws75.aptoide.com/api/7/listSearchApps?query=${encodeURIComponent(text)}`;
         let response = await axios.get(apiUrl);
         let data = response.data.datalist.list[0];  // Get the first result

         if (!data) return m.reply('لم يتم العثور على التطبيق. حاول مرة أخرى باستخدام اسم مختلف.');

         m.reply('جاري تحميل التطبيق...');

         let icon = data.icon;
         let paket = data.package;
         let size = (data.size / 1024 / 1024).toFixed(2) + ' MB';
         let nama = data.name;
         let up = data.updated;
         let file = data.file.path;
         let obbFile = data.obb?.main?.path;  
         let obbSize = data.obb?.main?.filesize ? (data.obb.main.filesize / 1024 / 1024).toFixed(2) + ' MB' : null;

       
         let caption = ` 𝐀𝐏𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃\n\n`;
         caption += `📦 اسم التطبيق: ${nama}\n`;
         caption += `🗓 تاريخ التحديث: ${up}\n`;
         caption += `📦 الحزمة: ${paket}\n`;
         caption += `📂 الحجم: ${size}\n`;
         if (obbSize) caption += `📂 حجم الـOBB: ${obbSize}\n`;
         caption += `\n*جاري التحميل...*`;

          conn.adReply(m.chat, caption, icon, m, { showAds: true });

          conn.sendMessage(m.chat, {
            document: { url: file },
            fileName: `${nama}.apk`,
            mimetype: 'application/vnd.android.package-archive'
         }, { quoted: m });

      
         if (obbFile) {
             conn.sendMessage(m.chat, {
               document: { url: obbFile },
               fileName: `main.${data.file.vercode}.${paket}.obb`,
               mimetype: 'application/octet-stream'
            }, { quoted: m });
         }

      } catch (error) {
         m.reply('حدث خطأ أثناء محاولة تحميل التطبيق. يرجى المحاولة مرة أخرى لاحقًا.');
         console.error(error);
      }
   },
   limit: 0,
   premium: false
};
