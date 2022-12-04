import path from 'path';

export const cd = (currentPath) => {
    try {
        const relativePath = path.relative(process.cwd(), currentPath);
        process.chdir(path.join(process.cwd(), relativePath))
        process.stdout.write(process.cwd() + '\n')
    } catch (error) {
        process.stdout.write('Operation failed\n')
    }
}