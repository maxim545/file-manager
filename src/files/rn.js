import path from 'path';
import fs from 'fs';

export const rn = async (params) => {
    try {
        const [pathToFile, fileName] = params.split(' ');
        if (pathToFile && fileName) {
            const relativePath = path.relative(process.cwd(), pathToFile);
            const pathToNewFile = path.join(path.dirname(relativePath), fileName);
            const stat = await fs.promises.lstat(relativePath);
            if (!stat.isFile()) {
                throw new Error()
            }
            fs.promises.rename(relativePath, pathToNewFile)
        } else {
            process.stdout.write('Invalid input\n')
        }
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}