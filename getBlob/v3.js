/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/8-13-stable/doc/api/repositories.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , modifyUrl = require('jinang/modifyUrl')
    , undertake = require('undertake')
    ;

module.exports = function*(_agent, options) {
    let urlname = modifyUrl.query(`/projects/${options.project_id}/repository/blobs/${options.ref}`, { filepath: options.path });
    let content = yield _agent.get(urlname);
    return content;
};