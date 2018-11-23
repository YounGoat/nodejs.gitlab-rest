'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , parseOptions = require('jinang/parseOptions')
    
    /* in-package */
    ;

/**
 * @param {string}  [options.search]
 * 
 * @return {object}
 * Returned options may contain:
 *   .search
 */
module.exports = function(_agent, options) {
    options = parseOptions(options, {
        caseSensitive: false,
        columns: [
            'search',
            'group_name ALIAS(name)',
        ],
    });

    if (!options.search && options.group_name) {
        options.search = options.group_name;
    }

    return options;
};