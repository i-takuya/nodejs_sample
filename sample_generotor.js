function* name(str) {
    for(var i = 0;i < 10;i++) {
	yield sleep(1000);
	console.log(i + "??????")
    }
}

const sleep = (ms) => {
    return new Promise((resolve) => {
	setTimeout(resolve, ms);	
    });
};


// genにiteratorが入ってる
let gen = name("hello world");
// execute
n = gen.next().value
console.log(n);
loop(n);

function loop(n) {
    n.then(function(result) {
	n = gen.next()
	if(!n.done) {
	    loop(n.value);
	}
    });
}
