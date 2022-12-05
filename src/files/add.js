import path from 'path';
import fs from 'fs';

export const add = async (fileName) => {
    try {
        await fs.promises.writeFile(fileName, '');
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}