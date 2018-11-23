/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/groups.md
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
    let queries = [];

    if (options.search) {
        queries.search = options.search;
    }

    let urlname = modifyUrl.query('/groups', queries);
    
    let data = yield lib.get_all_pages(_agent, urlname);
    
    // If `options.group_name` exists, filter the returned list and find the exactly matching one.
    if (options.group_name) {
        data = data.filter(group => group.name == options.group_name);
    }
    
    return data;
};