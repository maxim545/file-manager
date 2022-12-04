import path from 'path';

export const up = (currentPath) => {
    try {
        if (currentPath) {
            process.stdout.write('Invalid input\n')
        } else {
            process.chdir(path.join(process.cwd(), '..'))
            process.stdout.write(process.cwd() + '\n')
        }
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}