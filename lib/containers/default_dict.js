// https://stackoverflow.com/questions/19127650/defaultdict-equivalent-in-javascript
function DefaultDict(defaultInit = 0) {
	return new Proxy({}, {
	  get: (target, name) => name in target ?
	    target[name] :
	    (target[name] = typeof defaultInit === 'function' ?
	      new defaultInit().valueOf() :
	      defaultInit)
		});
}

module.exports = {
	DefaultDict,
	DD: DefaultDict,
}