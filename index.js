console.log('🕒 Starting . . .');
const path = require('path');
const { spawn } = require('child_process');
const __on = require('utils-mf/lib/__on.js');
const start = () => {
   const args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
   const p = spawn(process.argv[0], args, {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc']
   })
   .on('message', data => {
      if (data == 'reset') {
         console.log('🕒 Restarting . . .')
         p.kill(), delete p;         
      }
      if (data == 'uptime') {
         p.send(process.uptime())
      }
   })
   .on('exit', code => {
      console.error('Exited with code:', code)
      p.kill(), delete p, __on(), start();
   })
};
__on(), start();