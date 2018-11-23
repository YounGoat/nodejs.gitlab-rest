'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */  
    , noda = require('noda')
    , parseOptions = require('jinang/parseOptions')
    
    /* in-package */
    , findGroups = noda.inRequire('findGroups')
    ;

/**
 * @param {string}   [options.project_id]
 * @param {string}   [options.path]
 * @param {boolean}  [options.recursive]
 * @param {string}   [options.ref]
 * 
 * @return {object}
 * Returned options may contain:
 *   .project_id
 *   .path
 *   .recursive
 *   .ref
 */
module.exports = function*(_agent, options) {
    options = parseOptions(options, {
        caseSensitive: false,
        columns: [
            'project_id ALIAS(projectid) REQUIRED',
            'path ALIAS(pathname, subpath)',
            'recursive',
            'ref ALIAS(commit, commit_id, commitid, tag, branch)',
        ],
    });

    return options;
};