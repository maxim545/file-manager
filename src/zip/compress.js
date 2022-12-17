import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'node:stream/promises';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const compress = async (params) => {
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
            const compressFile = zlib.createBrotliCompress();
            const readStream = fs.createReadStream(relativePathToFile);
            const writeStream = fs.createWriteStream(path.join(relativePathToDir, fileName + '.br'));
            await pipeline(readStream, compressFile, writeStream);
            showCurrentDir()
        } else {
            showErrorMessage()
        }
    } catch (error) {
        showFailedMessage()
    }
}