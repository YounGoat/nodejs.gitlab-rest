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
 * @param {string} [options.username]  username of repository's owner
 * @param {string} [options.group_id]
 * @param {string} [options.group_name]
 *  
 * @return {object}
 * Returned options may contain:
 *   .username
 *   .group_id
 */
module.exports = function*(_agent, options) {
    options = parseOptions(options, {
        caseSensitive: false,
        columns: [
            'username',
            'group_id ALIAS(groupid)',
            'group_name ALIAS(groupname)',
            'project_name ALIAS(name)',
            'search',
        ],
    });

    if (options.username && _agent.version == 'v3') {
        throw new Error('option "username" is not acceptable by GitLab API v3');
    }

    if (options.group_id && options.group_name) {
        throw new Error('options "id" and "name" are mutually excluesive');
    }
    
    if (options.group_name) {
        options.group_id = yield libs.get_group_id_by_name(_agent, options.group_name);
        if (options.group_id == null) return null;
    }

    return options;
};