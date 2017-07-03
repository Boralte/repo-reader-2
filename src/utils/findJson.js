import fs from 'fs';

const isJson = (files) => {
    const json = ['package', 'PACKAGE.json', 'Package.json', 'package.json'];
    let jsonFile;
    files.map((file) => {
        if (json.includes(file)) jsonFile = file;
    });
    return jsonFile;
};

const displayJson = dir => new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
        if (!err && isJson(files) != null) {
            fs.readFile(`${dir}/package.json`, 'utf8', (error, data) => {
                if (!error) {
                    console.log('json data', data);
                    const jsonData = JSON.parse(data);
                    console.log('json JSON data', jsonData);
                    return resolve(jsonData);
                }
                console.log('json error:', error);
                return resolve(null);
            });
        } else {
            return resolve(null);
        }
    });
});

export default displayJson;
