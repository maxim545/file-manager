import path from 'path';
import fs from 'fs';


export const ls = async () => {
    try {
        const currentDir = process.cwd();
        const data = (await fs.promises
            .readdir(currentDir, { withFileTypes: true }))
            .map(item => {
                if (item.isDirectory()) {
                    return { name: item.name, type: 'directory' }
                } else if (item.isFile()) {
                    return { name: item.name, type: 'file' }
                }
            })
            .sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name))
            .forEach((item, i) => {
                console.log(`${i} - ${item.name} - ${item.type}`);
            })
    } catch (error) {

    }
}