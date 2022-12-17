import path from 'path';
import fs from 'fs';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const add = async (fileName) => {
    try {
        await fs.promises.writeFile(...fileName, '');
        showCurrentDir()
    } catch (error) {
        showFailedMessage()
    }
}