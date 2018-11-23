/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/11-4-stable/doc/api/groups.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

module.exports = function*(_agent, options) {
    let urlname = `/groups/${options.group_id}`;
    let data = yield _agent.get(urlname);
    return data;
};