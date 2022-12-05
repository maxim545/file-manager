import { commands } from './accessCommands.js'

export const handleData = (data) => {
    const dataArr = data.split(' ');
    const [command] = dataArr;
    dataArr.splice(0, 1);
    if (command in commands) {
        commands[command].call(this, dataArr.join(' '));
    } else {
        process.stdout.write('Invalid input\n')
    }

}