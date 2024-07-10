import { publicIpv6,publicIpv4 } from 'public-ip'
import generateMappingPage from './generateMappingPage.js'
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';
dotenv.config();
let cachedIp = undefined;

/*
exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            callback(error);
        } else {
            console.log(stdout);
            callback(null);
        }
    });
};
*/
const execPromise = promisify(exec);
async function executeCommand (command){
    try {
        const { stdout, stderr } = await execPromise(command);
        if (stderr) {
            console.error(`Error: ${stderr}`);
        } else {
            console.log(stdout);
        }
    } catch (error) {
        console.error(`Error executing command: ${error}`);
    }
};

async function commitNewContent(commitMessage){
    const targetDir = process.env.PATH_TO_HTML_PROJECT;
    const targetBranch = process.env.TARGET_BRANCH;
    const gitAdd = `git -C ${targetDir} add .`;
    const gitCommit = `git -C ${targetDir} commit -m "${commitMessage}"`;
    const gitPush = `git -C ${targetDir} push origin ${targetBranch}`;
    try {
        await executeCommand(gitAdd);
        await executeCommand(gitCommit);
        await executeCommand(gitPush);
        console.log('Commit and push completed successfully.');
    } catch (error) {
        console.error('Failed to commit and push:', error);
    }
}
export async function refreshIp(port){
    let currentIp = await publicIpv6();
    if(cachedIp != currentIp){
      cachedIp = currentIp;
      let newPageContent = generateMappingPage(cachedIp,port);
      console.log('generating new page content',newPageContent);
      writeFileSync(process.env.PATH_TO_REDIRECT_HTML, newPageContent, 'utf8');
      writeFileSync(process.env.PATH_TO_CONFIG,'theme: minima', 'utf8');//so thta github page do refresh
      commitNewContent('comming for '+cachedIp);
    }else{
        console.log('not generating new ip ');
    }
    setTimeout(() => {refreshIp();}, 3000);
  }