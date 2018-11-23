/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/users.md
 */

'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	
	/* in-package */
	;

module.exports = function(_agent) {
    let urlname = '/user';
    return _agent.get(urlname);
};