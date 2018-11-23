/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/11-4-stable/doc/api/projects.md
 */
 
'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , lib = noda.inRequireDir('lib')
    ;

module.exports = function(_agent, options) {
    let urlname;

    if (options.username) {
        /**
         * List user repositories
         * https://gitlab.com/help/api/projects.md
         */
        urlname = `/user/${options.username}/projects`;
    }
    else if (options.group_id) {
        /**
         * List a group's projects
         * https://gitlab.com/help/api/groups.md#list-a-groups-projects
         */
        urlname = `/groups/${options.group_id}/projects`;
    }
    
    let data = yield lib.get_all_pages(_agent, urlname);
    return data;
};