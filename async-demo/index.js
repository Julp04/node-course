console.log('Before');
getUser(1)
    .then(user => getRepos(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch(error => console.log(error.message));
console.log('After');

// Callbacks 
// Promises
// Async/await


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername: 'julp04'});
        }, 2000)
    })
}

function getRepos(username) {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Connecting to github api');
        resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
   })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve(['commit0'])
        }, 2000);
    })
}