/**
 * @see https://docs.gitlab.com/ee/api/project_badges.html
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

module.exports = function*(_agent, options) {
    let urlname = `/projects/${options.project_id}/badges`;
    let data = yield _agent.get(urlname);
    return data;
};