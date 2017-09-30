const co = require('co');

const sleep = (ms) => {
    return new Promise((resolve) => {
	setTimeout(resolve, ms);
    });
};

co(function* () {
    for(let i = 0;i < 5;i++) {
	console.log(i);
	yield sleep(1000);
    }
}).catch(function(err) {
    console.log(err);
});

console.log('test');
