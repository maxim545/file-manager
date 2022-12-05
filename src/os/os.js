import path from 'path';
import fs from 'fs';
import os from 'os';


class OsOperations {
    constructor() {
    }

    getEOL() {
        return process.stdout.write(JSON.stringify(os.EOL) + '\n')
    }

    getCpus() {
        const cpus = os.cpus();
        const cpuCount = cpus.length;
        console.log(`Amount: ${cpuCount}`);
        cpus.forEach(item => {
            const speed = (item.speed / 1000).toFixed(2);
            console.log(`Model: ${item.model}\nClock Rate: ${speed}GHz`)
        })
    }

    gethHomedir() {
        return process.stdout.write(os.homedir + '\n')
    }

    getUsername() {
        return process.stdout.write(os.userInfo().username + '\n')
    }

    getArchitecture() {
        return process.stdout.write(os.arch() + '\n')
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
            process.stdout.write('Invalid input\n')
        }
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}



