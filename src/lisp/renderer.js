define([], function() {
		function render$(src) {
			var stack = [],
				$root,
				ENTER$ = {},
				LEAVE = {};
			ENTER$[TYPE.expr] = function(node) {
				var $node = $('<span class="node">')
				.attr('data-node-type', node.type);
				var $parent = stack[stack.length-1];
				if ($parent) $parent.append($node);
				stack.push($('<span class="node-children">')
					.attr('data-node-type', node.type)
					.appendTo($node));
				if (!$root) $root = $node;
				return $node;
			};
			ENTER$[TYPE.seq] = function(node) {
				var $node = $('<span class="node">')
				.attr('data-node-type', node.type);
				var $parent = stack[stack.length-1];
				if ($parent) $parent.append($node);

				stack.push($('<span class="node-children">')
					.attr('data-node-type', node.type)
					.appendTo($node));
				if (!$root) $root = $node;
				return $node;
			};
			ENTER$[TYPE.atom] = function(node) {
				var $node = $('<button class="node" type="button">')
				.attr('data-node-type', node.type)
				.text(node.str);
				var $parent = stack[stack.length-1];
				if ($parent) $parent.append($node);
				if (!$root) $root = $node;
				return $node;
			};
			LEAVE[TYPE.expr] = function(node) {
				var $children = stack.pop(),
					$f = $children.children().first()
					.addClass('node-apply');
				$children.before($f);
			};
			LEAVE[TYPE.seq] = function(node) {
				stack.pop();
			};
			LEAVE[TYPE.atom] = function(node) {
			};
			walk(src, {
				enter: function(node) {
					var $node = ENTER$[node.type](node);
					if (node.id) {
						$node
							.append($('<span class="node-id">').text(node.id))
							.addClass('has-node-id');
					}
					if (node.classes) {
						$node
							.append($('<span class="node-classes">').text(node.classes.join('.')))
							.addClass('has-node-classes');
						each(node.classes, function(cl) {
							$node.addClass('meta-class-' + cl);
						})
					}
				},
				leave: function(node) {
					return LEAVE[node.type](node);
				}
			})
			return $root;
		}

		return {
			render$: render$
		};
});
