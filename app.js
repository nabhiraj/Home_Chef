import express from 'express'
import { refreshIp } from './IpSyncManager.js';
const app = express()
const ip = '::';
const port = 3000;
app.get('/',async function (req, res) {
  res.send('this is my test application');
});
refreshIp(port);
app.listen(port,ip,()=>{
    console.log('server is on...');
});