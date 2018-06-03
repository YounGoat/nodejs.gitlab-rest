'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , findProjects = noda.inRequire('findProjects')
    , token = noda.inRead('token', 'ascii')
    ;

findProjects({ 
    // username: 'YounGoat',
    groupid: 2952488,
    private_token: token,
})
.then(metas => {
    console.log('-- SUCCESS --');
    metas.forEach(meta => {
        console.log(`Project ${meta.name} found.`);
    });
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
