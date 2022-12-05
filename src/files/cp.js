import path from 'path';
import fs from 'fs';

export const cp = async (params) => {
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
            const readStream = fs.createReadStream(relativePathToFile, 'utf-8');
            const writeStream = fs.createWriteStream(path.join(relativePathToDir, fileName), 'utf-8');
            let str = '';
            readStream.on('data', chunk => str += chunk);
            readStream.on('end', () => writeStream.write(str));
        } else {
            process.stdout.write('Invalid input\n')
        }
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}