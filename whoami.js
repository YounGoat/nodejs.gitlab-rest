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

    let urlname = '/user';
    return _agent.get(urlname).then(data => {
        return data;
    });
};

module.exports = run;