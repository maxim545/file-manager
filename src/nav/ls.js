import path from 'path';
import fs from 'fs';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const ls = async () => {
    try {
        const currentDir = process.cwd();
        const dataArr = [];
        (await fs.promises
            .readdir(currentDir, { withFileTypes: true }))
            .map(item => {
                if (item.isDirectory()) {
                    return { name: item.name, type: 'directory' }
                } else {
                    return { name: item.name, type: 'file' }
                }
            })
            .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name))
            .forEach((item) => {
                dataArr.push({ name: item.name, type: item.type })
            })
        console.table(dataArr);
        showCurrentDir()
    } catch (error) {
        showFailedMessage()
    }
}