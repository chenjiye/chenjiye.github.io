define([], function() {
	var hasMetaId = _.compose(
		_.not(_.isBlankString),
		_.partialRight(_.result, 'id')
	);

	var hasMetaClasses = _.compose(
		_.and(_.isArray, _.not(_.isEmpty))
		_.partialRight(_.result, 'classes')
	);

	function generate(root) {
		var buffer = [];
		var gen = function(node) {
			switch (node.type) {
			case TYPE.expr:
				buffer.push('(');
				descend(node.children);
				buffer.push(')');
				break;

			case TYPE.seq:
				buffer.push('[');
				descend(node.children);
				buffer.push(']');
				break;

			case TYPE.atom:
				buffer.push(node.str);
				break;
			}

			if (hasMetaId(node)) {
				buffer.push('#' + node.id);
			}

			if (hasMetaClasses(node)) {
				buffer.push('.' + node.classes.join('.'));
			}
		};

		var descend = _.partialRight(_.each, gen);

		return buffer.join(' ');
	}

	return {
		generate: generate
	};
});
