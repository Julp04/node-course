console.log('Before');
getUser(1, (user) => {
    getRepos(user.gitHubUsername, (repos) => {
        console.log(repos);
    })
});
console.log('After');

// Callbacks 
// Promises
// Async/await


function getUser(id, callBack) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callBack({id: id, gitHubUsername: 'julp04'});
    }, 2000)
}

function getRepos(username, callBack) {
    setTimeout(() => {
        callBack(['repo1', 'repo2', 'repo3']);
    }, 2000);
}