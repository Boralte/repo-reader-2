import fs from 'fs';
import path from 'path';

const checkDirectory = filePath => new Promise((resolve) => {
    fs.stat(filePath, (err, xFile) => {
        if (!err && xFile.isDirectory()) {
            resolve(null, true);
        } else {
            resolve(new Error('Not a directory'), false);
        }
    });
});

export default (dir) => {
    const directories = [];
    return new Promise(resolve => fs.readdir(dir, (err, files) => Promise.all(
        files.map(file => checkDirectory(path.join(dir, file)).then((error) => {
            if (error) return;
            directories.push(file);
        }))).then(() => resolve(directories))));
};
