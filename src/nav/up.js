import path from 'path';
import { showCurrentDir, showErrorMessage, showFailedMessage } from '../info/info.js'

export const up = (currentPath) => {
    try {
        if (currentPath) {
            showErrorMessage()
        } else {
            process.chdir(path.join(process.cwd(), '..'))
            showCurrentDir()
        }
    } catch (error) {
        showFailedMessage()
    }
}