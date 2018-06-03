/**
 * @see
 *   GitLab API
 *   https://gitlab.com/help/api/README.md
 *   Now the version is v4.
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , htp = require('htp')
    , modifyUrl = require('jinang/modifyUrl')
    , noda = require('noda')
    
    /* in-package */
    , Agent = noda.inRequire('class/GitlabAgent')
    ;

/**
 * @param {Object} [options.api]
 * @param {string} [options.username]  username of repository's owner
 * @param {string} [options.groupid]
 * @return {Promise}
 */
function run(options) {
    let _agent = Agent.getOne(options);

    let queries = [];

    /**
     * List users
     * https://gitlab.com/help/api/users.md
     */
    if (options.username) {
        queries.username = options.username;
    }

    let urlname = modifyUrl.query('/users', queries);
    
    return _agent.get(urlname).then(data => {
        if (data == null) return [];
        if (data instanceof Array) return data;
    });
};

module.exports = run;