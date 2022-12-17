import { greetUser, takeLeaveUser, showCurrentDir } from './src/info/info.js'
import { handleData } from './src/handle.js';

const start = () => {
    const userName = greetUser(process.argv);
    process.on('SIGINT', () => { takeLeaveUser(userName) });
    process.stdin.on('data', async (data) => {
        const prsData = data.toString().trim();
        if (prsData === '.exit') {
            takeLeaveUser(userName)
        } else {
            handleData(prsData)
        }
    })

};

start();