import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

export const compress = async (params) => {
    try {
        const [pathToFile, pathToNewDir] = params.split(' ');
        if (pathToFile && pathToNewDir) {
            const relativePathToFile = path.relative(process.cwd(), pathToFile);
            const relativePathToDir = path.relative(process.cwd(), pathToNewDir);
            const fileName = path.basename(relativePathToFile)
            const statFile = await fs.promises.lstat(relativePathToFile);
            const statDir = await fs.promises.lstat(relativePathToDir);
            if (!statFile.isFile() || !statDir.isDirectory()) {
                throw new Error()
            }
            const readStream = fs.createReadStream(relativePathToFile);
            const writeStream = fs.createWriteStream(path.join(relativePathToDir, fileName + '.br'));

            const compressFile = zlib.createBrotliCompress().error(() => { throw new Error() });
            readStream.pipe(compressFile).pipe(writeStream);
        } else {
            process.stdout.write('Invalid input\n')
        }
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}