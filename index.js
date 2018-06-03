'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , htp = require('htp')
    , noda = require('noda')

    /* in-package */
    , GitlabAgent = noda.inRequire('class/GitlabAgent')
    ;

function Rest(token) {
    this.agent = new GitlabAgent(token);
}

Rest.prototype.classId = noda.inRequire('class.id');

Object.assign(Rest.prototype, {
    createRepository : require('./createRepository'),
    deleteRepository : require('./deleteRepository'),
    findRepositories : require('./findRepositories'),
    getRepository    : require('./getRepository'),
    whoami           : require('./whoami'),
});

module.exports = Rest;