define([], function() {
		var ATOM = /^[^\(\)\[\]\s.#]+/,
			SPACES = /^\s*/,
			META_ID = /^#[^\(\)\[\]\s]+/,
			META_CLASSES = /^\.[^\(\)\[\]\s]+/
		var TYPE = {
			expr: 'expr',
			seq: 'seq',
			atom: 'atom'
		};
		function parse(str) {
			var start = skipSpaces(str, 0)
			if (str[start] === '(') return parseExpr(TYPE.expr, ')', str, start, null,null)
			if (str[start] === '[') return parseExpr(TYPE.seq, ']', str, start, null,null)
		}
		function parseExpr(type,close,str, start, parent,index) {
			var i = skipSpaces(str, start+1),
				expr = {type:type, start:i, children:[], parent:parent, index:index};
			expr.end = i+1
			if (str[i] !== close) {
				expr.children = parseChildren(close, str, i, expr)
				if (expr.children) {
					expr.end = skipSpaces(str, expr.children[expr.children.length-1].end + 1)
				}
			}
			parseMeta(expr, str)
			expr.snippet = str.substring(expr.start,expr.end)
			return expr
		}
		function parseChildren(close, str, start, parent) {
			var children,
				child,
				z = str.length,
				count = 0
			for (var i=start; i < z;) {
				i = skipSpaces(str, i)
				if (str[i] === close) {
					break;
				} else if (str[i] === '[') {
					child = parseExpr(TYPE.seq, ']', str, i, parent, count);
				} else if (str[i] === '(') {
					child = parseExpr(TYPE.expr, ')', str, i, parent, count)
				} else {
					child = parseAtom(str, i, parent, count)
				}
				if (!child) break;
				if (!children) children = [];
				children.push(child)
				count++
				i = child.end
			}
			return children
		}
		function parseAtom(str, start, parent, index) {
			start = skipSpaces(str, start);
			var m = str.substring(start).match(ATOM)
			if (m) {
				var atom = {
					type:TYPE.atom,
					start: start,
					end: start + m[0].length,
					str: m[0],
					parent: parent,
					index: index
				}
				parseMeta(atom, str)
				atom.snippet = str.substring(atom.start, atom.end)
				return atom
			}
		}
		function parseMeta(node, str) {
			var m = str.substring(node.end).match(META_ID)
			if (m) {
				node.id = m[0].substring(1)
				node.end += m[0].length;
			}
			m = str.substring(node.end).match(META_CLASSES)
			if (m) {
				node.classes = m[0].substring(1).split('.')
				node.end += m[0].length;
			}
		}
		function skipSpaces(str, start) {
			return start + str.substring(start).match(SPACES)[0].length
		}
		
});
