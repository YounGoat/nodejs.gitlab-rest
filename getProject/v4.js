/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/11-4-stable/doc/api/projects.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

module.exports = function*(_agent, options) {
    let urlname = `/projects/${options.project_id}`;
    let data = yield _agent.get(urlname);
    return data;
};