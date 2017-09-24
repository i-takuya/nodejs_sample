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
	    console.log(time);
	    result = [time, 'success']
	    resolve(result);
	}).catch(function(stderr) {
	    end_time = new Date();
	    time = end_time - start_time
	    result = [time, 'failed']
	    console.log(time);
	    reject(result);
	});
    });
}

function restoreResult(results, value) {
    results.push(value);
    return results;
}
var tasks = [];
// 第一引数はthisでその後の変数は仮引数となる。
var pushValue = restoreResult.bind(null, [])
for (var i = 0;i < 5 ;i++) {
    // これ上書きじゃないの謎。
    // http://azu.github.io/promises-book/#then-return-new-promise
    promise = timerPromisefy(i * 1000).then(execCmdPromise).then(pushValue).catch(pushValue);
}

promise.then(function(value) {
    console.log(value)
}).catch(function(value) {
    console.log(value);
});
