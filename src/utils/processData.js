const processData = (data) => {
    const description = data && data.description ? data.description : 'No description available';
    const issueCount = data && data.open_issues ? data.open_issues : 'n/a';
    const issuesUrl = data && data.html_url ? `${data.html_url}/issues` : 'https://github.com/404';
    const language = data && data.language ? data.language : 'unknown';
    const homeLink = data && data.homepage ? data.homepage : 'https://github.com/404';
    const stars = data && data.stargazers_count ? data.stargazers_count : 'n/a';
    const starLink = data && data.html_url ? `${data.html_url}/stargazers` : 'https://github.com/404';
    const watchers = data && data.watchers_count ? data.watchers_count : 'n/a';
    const watcherLink = data && data.html_url ? `${data.html_url}/watchers` : 'https://github.com/404';
    let size = data && data.size ? data.size : 'N/A';
    if (size === 'N/A') size = '0 MB';
    else if (size < 1024) size = `${size} B`;
    else if (size < 1048576) size = `${(size / 1024).toFixed(0)} KB`;
    else if (size < 1073741824) size = `${(size / 1048576).toFixed(0)} MB`;
    else if (size > 1073741824) size = `${(size / 1073741824).toFixed(0)} GB`;
    let issueStatus = null;
    if (issueCount > 40) {
        issueStatus = 'red';
    } else if (issueCount > 15) {
        issueStatus = 'orange';
    } else if (issueCount <= 15) {
        issueStatus = 'green';
    } else {
        issueStatus = 'gray';
    }
    return {
        description,
        issueCount,
        issuesUrl,
        language,
        homeLink,
        stars,
        starLink,
        watchers,
        watcherLink,
        size,
        issueStatus,
    };
};

export default processData;
