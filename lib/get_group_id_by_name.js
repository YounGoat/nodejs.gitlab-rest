'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, noda = require('noda')
	
	/* in-package */
	, findGroups = noda.inRequire('findGroups')
	;

module.exports = function*(_agent, group_name) {
	let groups = yield findGroups({ group_name }, _agent);

	if (groups.length > 1) {	
		throw new Error(`more than 1 groups found with name "${group_name}"`);
	}
	else if (groups.length == 0) {
		throw new Error(`no groups found with name "${group_name}"`);
	}
	else {
		return groups[0].id;
	}

};