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
 * @return {Promise}
 */
function run(options) {
    let _agent = Agent.getOne(options);

    let queries = [];

    /**
     * List groups
     * https://gitlab.com/help/api/groups.md
     */
    if (options.search) {
        queries.search = options.search;
    }

    let urlname = modifyUrl.query('/groups', queries);
    
    return _agent.get(urlname).then(data => {
        if (data == null) return [];
        if (data instanceof Array) return data;
    });
};

module.exports = run;