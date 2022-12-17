import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const greetUser = (argv) => {
    const [, userName] = argv
        .filter(arg => arg.indexOf('--username') === 0)
        .join('')
        .split('=')
    process.stdout.write(`Welcome to the File Manager, ${userName}!\n`)
    showCurrentDir();
    return userName;
}

export const takeLeaveUser = (userName) => {
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`)
    process.exit();
}

export const showCurrentDir = () => {
    console.log(`You are currently in ${process.cwd()}`);
}

export const showErrorMessage = () => {
    process.stdout.write('Invalid input\n')
    showCurrentDir()
}

export const showFailedMessage = () => {
    process.stdout.write('Operation failed\n')
    showCurrentDir()
}