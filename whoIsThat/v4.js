/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/11-4-stable/doc/api/version.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

module.exports = function(_agent) {
    var urlname = `/version`;
    return _agent.get(urlname);
};