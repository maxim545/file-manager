import path from 'path';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const cd = (currentPath) => {
    try {
        const relativePath = path.relative(process.cwd(), ...currentPath);
        process.chdir(relativePath)
        showCurrentDir();
    } catch (error) {
        showFailedMessage()
    }
}