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
    , htp = require('htp')
    , modifyUrl = require('jinang/modifyUrl')
    , noda = require('noda')
    , parseOptions = require('jinang/parseOptions')
    , undertake = require('undertake')
    
    /* in-package */
    , Agent = noda.inRequire('class/GitlabAgent')
    ;

/**
 * @param {Object} [options.api]
 * @param {string} [options.name]
 * @return {Promise}
 */
function run(options) {
    return undertake(function*() {

        let _agent = Agent.getOne(options);

        let po = parseOptions(options, {
            caseSensitive: false,
            columns: [
                'namespace',
                'project_name',
                'project_id ALIAS(projectid)',
                'path ALIAS(pathname, subpath)',
                'ref ALIAS(branch, tag, commit)',
            ],
        });


        if (po.project_id) {
            po.project = po.project_id;
            delete po.project_id;
        }
        else {
            po.project = encodeURIComponent(`${po.namespace}/${po.project_name}`);
            delete po.namespace;
            delete po.project_name;
        }


        return require('./' + _agent.version)(_agent, po);
    });
};

module.exports = run;