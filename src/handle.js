import { commands } from './accessCommands.js'
import { showCurrentDir, showErrorMessage, showFailedMessage } from './info/info.js'

export const handleData = (data) => {
    let args = handleArgs(data);
    const [command] = args;
    args.splice(0, 1);
    args = args.length ? args : null
    if (command in commands) {
        commands[command].call(this, args);
    } else {
        showErrorMessage()
    }

}

const handleArgs = (args) => {
    if (args.indexOf(`"`) !== -1) {
        return args.split(`"`).map((str) => str.trim()).filter((item) => item.length)
    } else {
        return args.replace(/ /g, ' ').split(' ').map((str) => str.trim())
    }
}
