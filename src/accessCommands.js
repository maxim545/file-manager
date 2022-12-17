import { up } from './nav/up.js';
import { cd } from './nav/cd.js';
import { ls } from './nav/ls.js';
import { cat } from './files/cat.js';
import { add } from './files/add.js';
import { rn } from './files/rn.js';
import { cp } from './files/cp.js';
import { mv } from './files/mv.js';
import { rm } from './files/rm.js';
import { osHandler } from './os/os.js';
import { calculateHash } from './hash/hash.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';

export const commands = {
    'up': up,
    'cd': cd,
    'ls': ls,
    'cat': cat,
    'add': add,
    'rn': rn,
    'cp': cp,
    'mv': mv,
    'rm': rm,
    'os': osHandler,
    'hash': calculateHash,
    'compress': compress,
    'decompress': decompress,
}