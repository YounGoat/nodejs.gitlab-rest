/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/version.md
 * @see https://docs.gitlab.com/ee/api/version.html
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    
    /* in-package */
    ;

module.exports = function*(_agent) {
    let urlname = `/version`;
    let data = yield _agent.get(urlname);

    if (data == null) {
        data = {
            version: '<8.13',
            revision: null,
        };
    }

    return data;
};