import path from 'path';
import fs from 'fs';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const rm = async (pathToFile) => {
    try {
        const relativePath = path.relative(process.cwd(), ...pathToFile);
        const stat = await fs.promises.lstat(relativePath);
        if (!stat.isFile()) {
            throw new Error()
        }
        fs.promises.rm(relativePath);
        showCurrentDir()
    } catch (error) {
        showFailedMessage()
    }
}