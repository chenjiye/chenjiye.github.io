define([], function() {
		var QUERY = {
			'id': function(ast_id, src) {
				var found,
					id = ast_id.str;
				walk(src, {
					enter: function(node) {
						if (node.id === id) {
							found = node;
							return walk.STOP;
						}
					}
				});
				return found;
			}
		};
		function find(src, q) {
			return run(QUERY, q, [src]);
		}
		function query(src, str) {
			var q = parse(str),
				result = {
					found: find(src, q),
					replaceWith: function(node) {
						var parent = this.found.parent,
							i = this.found.index;
						node.parent = parent;
						node.index = i;
						parent.children[i] = node;
					}
				};
			return result;
		}
});

