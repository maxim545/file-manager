import { up } from './nav/up.js';
import { cd } from './nav/cd.js';
import { ls } from './nav/ls.js';


export const commands = {
    'up': up,
    'cd': cd,
    'ls': ls,
}