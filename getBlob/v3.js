/**
 * @see
 *   GitLab API
 *   https://gitlab.com/help/api/README.md
 *   Now the version is v4.
 *   
 *   Repositories API
 *   https://gitlab.com/help/api/repositories.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , modifyUrl = require('jinang/modifyUrl')
    , undertake = require('undertake')
    ;

module.exports = function getBlob(_agent, po) {
    return undertake(function*() {
        let urlname = modifyUrl.query(`/projects/${po.project}/repository/blobs/${po.ref}`, { filepath: po.path });
        let content = yield _agent.get(urlname);
        return content;
    });
};