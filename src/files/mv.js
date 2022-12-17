import path from 'path';
import fs from 'fs';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const mv = async (params) => {
    try {
        const [pathToFile, pathToNewDir] = params;
        if (pathToFile && pathToNewDir) {
            const relativePathToFile = path.relative(process.cwd(), pathToFile);
            const relativePathToDir = path.relative(process.cwd(), pathToNewDir);
            const fileName = path.basename(relativePathToFile)
            const statFile = await fs.promises.lstat(relativePathToFile);
            const statDir = await fs.promises.lstat(relativePathToDir);
            if (!statFile.isFile() || !statDir.isDirectory()) {
                throw new Error()
            }
            const readStream = fs.createReadStream(relativePathToFile, 'utf-8');
            const writeStream = fs.createWriteStream(path.join(relativePathToDir, fileName), 'utf-8');
            let str = '';
            await new Promise(async () => {
                readStream.pipe(writeStream);
                readStream.on('end', () => showCurrentDir());
            })
            fs.promises.rm(relativePathToFile);
        } else {
            showErrorMessage()
        }
    } catch (error) {
        showFailedMessage()
    }
}