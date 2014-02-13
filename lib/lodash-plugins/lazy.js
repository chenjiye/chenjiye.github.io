_.not = function(f) {
	return function() {
		return !f.apply(this, arguments);
	};
};

_.and = function() {
	var predicates = arguments;
	return function() {
		var args = arguments;
		return _.every(predicates, function(p) {
			return p.apply(this, args);
		}, this);
	};
};

_.or = function() {
	var predicates = arguments;
	return function() {
		var args = arguments;
		return _.any(predicates, function(p) {
			return p.apply(this, args);
		}, this);
	};
};

_.testRegExp = function(r, loop) {
	return function() {
		return loop.call(this, arguments, _.partial(_.invoke, r, 'test'));
	};
};

_.isBlankString = _.and(_.isString, _.testRegExp(/^\s*$/, _.every));
