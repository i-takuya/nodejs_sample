const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);
const timer = Promise.promisify(setTimeout);
// `delay`ミリ秒後にresolveする
function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
	    resolve('l -ls')
        }, delay);
    });
}

function execCmdPromise(cmd) {
    var start_time = new Date();
    return new Promise(function (resolve, reject) {
	exec(cmd).then(function(stdout) {
	    end_time = new Date();
	    time = end_time - start_time
	    console.log(stdout);
	    result = [time, 'success']
	    resolve(result);
	}).catch(function(stderr) {
	    end_time = new Date();
	    time = end_time - start_time
	    result = [time, 'failed']
	    reject(result);
	});
    });
}

// 全てがresolveされたら終了
Promise.all([
    timerPromisefy(0).then(execCmdPromise),
    timerPromisefy(1000).then(execCmdPromise),
    timerPromisefy(2000).then(execCmdPromise),
    timerPromisefy(3000).then(execCmdPromise)
]).then(function(results) {
    console.log(results);
}).catch(function(results) {
    console.log(results);
});
