/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/8-13-stable/doc/api/repositories.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , Directory = require('jinang/Directory')
    , modifyUrl = require('jinang/modifyUrl')
    , tar = require('tar')
    ;

module.exports = function*(_agent, options) {
    const tarname = '__gitlab_archive__.tar';

    let dir = new Directory(options.target);
    // dir.rmfr('*');
    // dir.mkdir('.');
    
    let queries = {};

    if (options.ref) {
        queries.sha = options.ref;
    }

    let urlname = modifyUrl.query(`/projects/${options.project_id}/repository/archive`, queries);
    let content = yield _agent.get(urlname);
    dir.write(tarname, content);

    yield tar.x({
        file: dir.resolve(tarname),
        strip: 1,
        C: dir.resolve('.'),
    });

    dir.rmfr(tarname);
    return true;
};