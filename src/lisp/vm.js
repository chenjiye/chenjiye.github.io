define([], function() {
	function run(context, prog, args) {
		var f = context[prog.children[0].str]
		return f.apply(prog, prog.children.slice(1).concat(args));
	}
	return run;
});
