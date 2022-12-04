import { commands } from './accessCommands.js'

export const handleData = (data) => {
    const [command, params] = data.split(' ')
    if (command in commands) {
        commands[command].call(this, params)
    } else {
        process.stdout.write('Invalid input\n')
    }

}