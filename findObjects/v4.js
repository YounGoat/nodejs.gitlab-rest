/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/11-4-stable/doc/api/repositories.md
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/repository_files.md
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
    let queries = {};

    if (options.path) {
        // Trim the leading slash.
        queries.path = options.path.replace(/^\//, '');
    }

    if (options.ref) {
        queries.ref = options.ref;
    }

    if (options.recursive) {
        queries.recursive = true;
    }

    let urlname = modifyUrl.query(`/projects/${options.project_id}/repository/tree`, queries);
    let data = yield lib.get_all_pages(_agent, urlname);
    return data
};;