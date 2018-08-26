const p = new Promise((resolve, reject) => {
     // Kick off some async works
     // ...
     setTimeout(() => {
        reject(new Error('message'));
     }, 2000);
});

p
 .then(result => console.log('Result', result))
 .catch(error => console.log('Error', error.message));