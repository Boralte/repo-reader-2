const request = require('request');
const process = require('process');

const githubToken = process.env && process.env.GITHUB_TOKEN;
console.log('gh token', githubToken);

const fetchGithub = shortUrl => new Promise((resolve) => {
    const options = {
        url: `https://api.github.com/repos/${shortUrl}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36',
            Authorization: `token ${githubToken}`,
        },
    };
    request(options, (error, response, body) => {
        let data = {};
        if (!error && response.statusCode === 200) {
            data = JSON.parse(body);
            console.log(body);
        } else {
            console.log('GitHub status', response.statusCode);
        }
        return resolve(data);
    });
});

export default fetchGithub;
