import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const calculateHash = async (pathToFile) => {
    try {
        const relativePath = path.relative(process.cwd(), ...pathToFile);
        const stat = await fs.promises.lstat(relativePath);
        if (!stat.isFile()) {
            throw new Error()
        }
        const readStream = fs.createReadStream(relativePath, 'utf-8');
        let str = '';
        readStream.on('data', chunk => str += chunk);
        readStream.on('end', () => {
            const hash = crypto.createHash('sha256').update(str).digest('hex');
            process.stdout.write(hash + '\n');
            showCurrentDir()
        });
    } catch (error) {
        showFailedMessage()
    }
}