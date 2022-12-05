import path from 'path';
import fs from 'fs';

export const cat = async (pathToFile) => {
    try {
        const relativePath = path.relative(process.cwd(), pathToFile);
        const stat = await fs.promises.lstat(relativePath);
        if (!stat.isFile()) {
            throw new Error()
        }
        const readStream = fs.createReadStream(relativePath, 'utf-8');
        let str = '';
        readStream.on('data', chunk => str += chunk);
        readStream.on('end', () => process.stdout.write(str));
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}