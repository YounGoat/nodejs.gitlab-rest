'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , findGroups = noda.inRequire('findGroups')
    , token = noda.inRead('token', 'ascii')
    ;

findGroups({ 
    search: 'ares',
    private_token: token,
})
.then(metas => {
    console.log('-- SUCCESS --');
    metas.forEach(meta => {
        // console.log(meta);
        console.log(`Group ${meta.name} found.`);
    });
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
