import fs from 'fs';

const isReadme = (files) => {
    const readme = ['readme', 'ReadMe', 'Readme', 'README.md'];
    let readmeFile;
    files.map((file) => {
        if (readme.includes(file)) readmeFile = file;
    });
    console.log(readmeFile);
    return readmeFile;
};

const displayReadme = dir => new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
        if (!err && isReadme(files) != null) {
            return resolve(true);
        }
        return resolve(false);
    });
});

export default displayReadme;
