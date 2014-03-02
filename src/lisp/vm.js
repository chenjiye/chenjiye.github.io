define([], function() {
	function run(context, prog, args) {
		var fName = prog.children[0].str
		var f = context[fName]
		if (!f) return;
		var fArgs = _.rest(prog.children, 1)
		if (_.isArray(args)) {
			fArgs = args.concat(fArgs)
		}
		return f.apply(prog, fArgs)
	}
	return {
		run: run
	}
})
