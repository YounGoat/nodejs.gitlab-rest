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
    , noda = require('noda')
    , parseOptions = require('jinang/parseOptions')
    , modifyUrl = require('jinang/modifyUrl')
    
    /* in-package */
    , Agent = noda.inRequire('class/GitlabAgent')
    ;

/**
 * @param {Object} [options.api]
 * @param {string} [options.name]
 * @return {Promise}
 */
function run(options) {
    let _agent = Agent.getOne(options);

    let po = parseOptions(options, {
        caseSensitive: false,
        columns: [
            'project_id REQUIRED ALIAS(projectid)',
            'path ALIAS(pathname, subpath)',
            'branch',
            'tag',
            'commit ALIAS(commit_id, commitid)',
            'recursive',
        ],
    });

    let queries = {};
    if (po.path) {
        // Trim the leading slash.
        queries.path = po.path.replace(/^\//, '');
    }

    if (po.branch) {
        queries.ref = po.branch;
    }
    if (po.commit) {
        queries.ref = po.commit;
    }
    if (po.tag) {
        queries.ref = po.tag;
    }

    if (po.recursive) {
        queries.recursive = true;
    }

    let urlname = modifyUrl.query(`/projects/${po.project_id}/repository/tree`, queries);
    return _agent.get(urlname);
};

module.exports = run;