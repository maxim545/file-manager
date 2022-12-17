import path from 'path';
import fs from 'fs';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const rn = async (params) => {
    try {
        const [pathToFile, fileName] = params;
        if (pathToFile && fileName) {
            const relativePath = path.relative(process.cwd(), pathToFile);
            const pathToNewFile = path.join(path.dirname(relativePath), fileName);
            const stat = await fs.promises.lstat(relativePath);
            if (!stat.isFile()) {
                throw new Error()
            }
            fs.promises.rename(relativePath, pathToNewFile)
            showCurrentDir()
        } else {
            showErrorMessage()
        }
    } catch (error) {
        showFailedMessage()
    }
}