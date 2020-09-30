'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , noda = require('noda')

    /* in-package */
    , GitlabAgent = noda.inRequire('class/GitlabAgent')
    ;

function Rest(token) {
    this.agent = new GitlabAgent(token);
}

Rest.prototype.classId = noda.inRequire('class.id');

[ 
    'findBadges',
    'findGroups',
    'findProjects',
    'findObjects',
    'getGroup',
    'getProject',
    'getBlob',
    'whoAmI',
    'whoIsThat',
].forEach(name => {
    Rest.prototype[name] = noda.inRequire(name);
});

module.exports = Rest;