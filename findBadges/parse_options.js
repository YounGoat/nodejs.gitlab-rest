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
 * @param {string} [options.project_id]
 * 
 * @return {object}
 * Returned options may contain:
 *   .group_id
 */
module.exports = function*(_agent, options) {
    options = parseOptions(options, {
        caseSensitive: false,
        columns: [
            'namespace',
            'project_name ALIAS(projectname)',
            'project_id ALIAS(projectid, project_path, projectpath)',
        ],
    });

    return options;
};