import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'node:stream/promises';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const decompress = async (params) => {
    try {
        const [pathToFile, pathToNewDir] = params;
        if (pathToFile && pathToNewDir) {
            const relativePathToFile = path.relative(process.cwd(), pathToFile);
            const relativePathToDir = path.relative(process.cwd(), pathToNewDir);
            const fileName = path.basename(relativePathToFile).replace('.br', '')
            const statFile = await fs.promises.lstat(relativePathToFile);
            const statDir = await fs.promises.lstat(relativePathToDir);
            if (!statFile.isFile() || !statDir.isDirectory()) {
                throw new Error()
            }
            const readStream = fs.createReadStream(relativePathToFile);
            const writeStream = fs.createWriteStream(path.join(relativePathToDir, fileName));

            const decompressFile = zlib.createBrotliDecompress()
            await pipeline(readStream, decompressFile, writeStream);
            showCurrentDir()
        } else {
            showErrorMessage()
        }
    } catch (error) {
        showFailedMessage()
    }
}