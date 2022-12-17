import path from 'path';
import fs from 'fs';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const cat = async (pathToFile) => {
    try {
        const relativePath = path.relative(process.cwd(), ...pathToFile);
        const stat = await fs.promises.lstat(relativePath);
        if (!stat.isFile()) {
            throw new Error()
        }
        const readStream = fs.createReadStream(relativePath, 'utf-8');
        readStream.on('data', data => {
            process.stdout.write(data.toString() + '\n');
        });
        readStream.on('end', () => showCurrentDir());
    } catch (error) {
        showFailedMessage()
    }
}