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
    , noda = require('noda')
    
    /* in-package */
    , getGitlabAgent = noda.inRequire('lib/getGitlabAgent')
    ;

/**
 * @param {Object} [options.api]
 * @param {string} [options.username]  username of repository's owner
 * @param {string} [options.groupid]
 * @return {Promise}
 */
function run(options) {
    let _agent = getGitlabAgent(options);

    let urlname;

    /**
     * Search
     * https://developer.Gitlab.com/v3/search/
     */
    if (options.name) {
        // let Qs = [];
        // Qs.push(`${options.name}in:name`);

        // if (options.username) {
        //     Qs.push(`user:${options.username}`);
        // }

        // if (options.orgname) {
        //     Qs.push(`org:${options.orgname}`);
        // }

        // urlname = `/search/repositories?q=${Qs.join('+')}`;
    }
    else if (options.username) {

        /**
         * List user repositories
         * https://gitlab.com/help/api/projects.md
         */
        urlname = `/user/${options.username}/projects`;
    }
    else if (options.groupid) {
        /**
         * List a group's projects
         * https://gitlab.com/help/api/groups.md#list-a-groups-projects
         */
        urlname = `/groups/${options.groupid}/projects`;
    }
    
    return _agent.get(urlname).then(data => {
        if (data == null) return [];
        if (data instanceof Array) return data;
    });
};

module.exports = run;