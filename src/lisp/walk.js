define([], function() {
	var walk = function(node, options) {
		var result;
		result = options.enter && options.enter(node);
		if (result === walk.STOP) return walk.STOP;
		if (result !== walk.DO_NOT_DESCEND) {
			var i = 0,
				n = node.children ? node.children.length : 0;
			for (; i < n; i++) {
				result = walk(node.children[i], options);
				if (result === walk.STOP) return walk.STOP;
				if (result === walk.BREAK) break;
			}
		}
		if (options.leave) {
			result = options.leave(node);
		}
		return result;
	}

	walk.DO_NOT_DESCEND = 'DO_NOT_DESCEND';
	walk.BREAK = 'BREAK';
	walk.STOP = 'STOP';

	return walk;
});
