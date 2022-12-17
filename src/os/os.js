import path from 'path';
import fs from 'fs';
import os from 'os';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

class OsOperations {
    constructor() {
    }

    getEOL() {
        process.stdout.write(JSON.stringify(os.EOL) + '\n')
        showCurrentDir()
    }

    getCpus() {
        const cpus = os.cpus();
        const cpuCount = cpus.length;
        console.log(`Amount: ${cpuCount}`);
        cpus.forEach(item => {
            const speed = (item.speed / 1000).toFixed(2);
            console.log(`Model: ${item.model}\nClock Rate: ${speed}GHz`)
        })
        showCurrentDir()
    }

    gethHomedir() {
        process.stdout.write(os.homedir + '\n')
        showCurrentDir()
    }

    getUsername() {
        process.stdout.write(os.userInfo().username + '\n')
        showCurrentDir()
    }

    getArchitecture() {
        process.stdout.write(os.arch() + '\n')
        showCurrentDir()
    }
}

const operation = new OsOperations();

const osCommands = {
    '--EOL': operation.getEOL,
    '--cpus': operation.getCpus,
    '--homedir': operation.gethHomedir,
    '--username': operation.getUsername,
    '--architecture': operation.getArchitecture,
}

export const osHandler = async (operationName) => {
    try {
        if (operationName in osCommands) {
            osCommands[operationName].call(this);
        } else {
            showErrorMessage()
        }
    } catch (error) {
        showFailedMessage()
    }
}



