const exec = require('child_process').exec;
var result = [];
for(var i = 0;i < 3;i++) {
    setTimeout(() => {
	
	exeCmd('ls ./');
    }, i * 1000);
};

console.log(result);

function exeCmd(cmd) {
    var start_time = new Date();
    exec(cmd, (err, stdout, stderr) => {
	if(err) {console.log(err);}
	end_time = new Date();
	result.push(end_time - start_time)
    });
}

		   
    
