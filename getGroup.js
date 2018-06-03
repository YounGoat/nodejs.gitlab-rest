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
    , undertake = require('undertake')
    
    /* in-package */
    , Agent = noda.inRequire('class/GitlabAgent')
    ;

/**
 * @param {Object} [options.api]
 * @param {string} [options.id]
 * @return {Promise}
 */
function run(options) {
    return undertake(function*() {
        let _agent = Agent.getOne(options);

        var urlname = `/groups/${options.id}`;
        let group = yield _agent.get(urlname);

        return group;
    });
};

module.exports = run;