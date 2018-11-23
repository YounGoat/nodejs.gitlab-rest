'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */  
    , noda = require('noda')
    , parseOptions = require('jinang/parseOptions')
    
    /* in-package */
    , libs = noda.inRequireDir('lib')
    ;

/**
 * @param {string} [options.namespace]
 * @param {string} [options.project_name]
 * @param {string} [options.project_id]
 * @param {string}  options.path
 * @param {string} [options.ref]
 * @param {string}  options.target
 * 
 * Returned options may contain:
 *   .project_id
 *   .ref
 *   .target
 */
module.exports = function*(_agent, options) {
    options = parseOptions(options, {
        caseSensitive: false,
        columns: [
            'namespace',
            'project_name ALIAS(projectname)',
            'project_id ALIAS(projectid, project_path, projectpath)',
            'ref ALIAS(commit, commit_id, commitid, tag, branch)',
            'target REQUIRED'
        ],
    });

    if (options.namespace && options.project_name) {
        options.project_id = encodeURIComponent(`${options.namespace}/${options.project_name}`);
        delete options.namespace;
        delete options.project_name;
    }

    return options;
};