/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/projects.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , modifyUrl = require('jinang/modifyUrl')
    , noda = require('noda')
    
    /* in-package */
    , lib = noda.inRequireDir('lib')
    ;

module.exports = function*(_agent, options) {
    let urlname;
    let query = {};

    if (options.group_id) {
        /**
         * List a group's projects
         * https://gitlab.com/help/api/groups.md#list-a-groups-projects
         */
        urlname = `/groups/${options.group_id}/projects`;
    }
    else {
        urlname = '/projects';
    }

    if (options.search) {
        query.search = options.search;
    }

    urlname = modifyUrl.query(urlname, query);

    let data = yield lib.get_all_pages(_agent, urlname);    
    return data;
};