const exec = require('child_process').exec;

class DirectoryReader {

    isRepo(filePath, callback) {
        exec(`cd "${filePath}" && git status`, (error, stdout, stderr) => {
            if (error) {
                console.error(filePath, `exec error: ${error}`);
                callback(new Error('Not a directory'), false);
            } else {
                callback(null, true);
            }
        });
    }
}

export default DirectoryReader;
