const exec = require('child_process').exec;

const githubUrl = filePath => new Promise((resolve) => {
    let url = null;
    exec(`cd ${filePath} && git config --get remote.origin.url`, (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            url = 'https://github.com/404';
        } else {
            url = stdout.replace(/.*(github.com\/)/, '').replace('.git', '');
        }
        console.log(url);
        return resolve(url);
    });
});

export default githubUrl;
