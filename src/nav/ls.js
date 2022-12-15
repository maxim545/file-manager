import path from 'path';
import fs from 'fs';


export const ls = async () => {
    try {
        const currentDir = process.cwd();
        const dataArr = [];
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
                dataArr.push({ name: item.name, type: item.type })
            })
        console.table(dataArr);
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}