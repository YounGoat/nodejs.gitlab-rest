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
 * @param {string} [options.group_id]
 * @param {string} [options.group_name]
 * 
 * @return {object}
 * Returned options may contain:
 *   .group_id
 */
module.exports = function*(_agent, options) {
    options = parseOptions(options, {
        caseSensitive: false,
        columns: [
            'group_name ALIAS(name, groupname)',
            'group_id ALIAS(id, groupid)',
        ],
    });

    if (!options.group_id && !options.group_name) {
        throw new Error('options "group_id" or "group_name" required');
    }

    if (options.group_id && options.group_name) {
        throw new Error('options "group_id" and "group_name" are mutually excluesive');
    }

    if (options.group_name) {
        options.group_id = yield libs.get_group_id_by_name(_agent, options.group_name);
        if (options.group_id == null) return null;
    }
    
    return options;
};