import fs from 'fs';
import path from 'path';
import build from '../src/build';

async function main() {
    const packagesPath = path.resolve(__dirname, '..', '..', 'packages');
    const folderNames = fs.readdirSync(packagesPath, { withFileTypes: true }).filter(dirent => {
        return dirent.isDirectory() && (['core', 'gateway', 'workers'].includes(dirent.name) || /^plugin-.+?-api$/.test(dirent.name));
    }).map(dirent => dirent.name);

    
    for(const folderName of folderNames) {
        try {
            console.log(`----------------- Building ${folderName} --------------------------`);
            await build(folderName);
            console.log(`----------------- Finished building ${folderName} --------------------------\n\n\n`);
        } catch (e) {
            break;
        }
        
    }
    // await build('gateway');
    
}

main();