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

        // ---------------------------
        // STEP 1.
        // Get Basic Info.

        var urlname = `/users/${options.id}`;

        // Is this effective without being identified as administrator?
        urlname = modifyUrl.query(urlname, { with_custom_attributes: true });

        let user = yield _agent.get(urlname);

        // ---------------------------
        // STEP 2.
        // Get Custom Attributes.
        
        /**
         * Custom Attributes API
         * https://gitlab.com/help/api/custom_attributes.md
         * > Every API call to custom attributes must be authenticated as administrator.
         */

        // var urlname = `/users/${user.id}/custom_attributes`;
        // let attrs = yield _agent.get(urlname);
        // user.custom_attributes = attrs;

        return user;
    });
};

module.exports = run;