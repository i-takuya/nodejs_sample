const co = require('co');
const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);
var result = [];
var success = [];

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

//実行するとsetTimeoutが呼ばれてresolveコールバック関数が呼ばれるpromiseオブジェクトが生成される。
// promise.then はコールバックを登録するための関数
//今回の場合valueを表示する関数をresolveとして渡す
co(function*() {
    for (let i = 0; i < 5; i++) {
	execCmd('ls ./');
	console.log(result);
	yield sleep(2000);
	if (i == 4) {
	    console.log(success);
	    console.log(result);
	}
    }
});

function execCmd(cmd) {
    var start_time = new Date();
    exec(cmd).then(function(stdout) {
	end_time = new Date();
	result.push(end_time - start_time);
	success.push('success');
	console.log(stdout);
    }).catch(function(stderr) {
	end_time = new Date();
	result.push(end_time - start_time);
	success.push('failed');
	console.log(stderr);
    });
}

function execCmdPromise(cmd) {
    var start_time = new Date();
    return new Promise(function (resolve, reject) {
	exec(cmd).then(function(stdout) {
	    end_time = new Date();
	    result.push(end_time - start_time);
	    success.push('success');
	    console.log(stdout);
	    resolve(stdout);
	}).catch(function(stderr) {
	    end_time = new Date();
	    result.push(end_time - start_time);
	    success.push('failed');
	    console.log(stderr);
	    reject(stderr);
	});
    });
}

/*
(function exeCmd(cmd, i) {
    if (i < 10) {
    // execを実行してその実行時間をresolveに渡すpromiseを返す
	return Promise.delay(100).then(function() {
	    var start_time = new Date();
	    exec(cmd, (err, stdout, stderr) => {
		if(err) {console.log(err);}
		end_time = new Date();
		result.push(end_time - start_time);
		console.log(stdout);
		console.log(result);
	    });
	    console.log(i+1);
	    return i + 1;
	}).then(exeCmd);
    }
    return Promise.resolve(cmd, i);
})('ls ./', 3);
*/
