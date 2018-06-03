'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , findUsers = noda.inRequire('findUsers')
    , token = noda.inRead('token', 'ascii')
    ;

findUsers({ 
    username: 'youngoat',
    private_token: token,
})
.then(metas => {
    console.log('-- SUCCESS --');
    metas.forEach(meta => {
        // console.log(meta);
        console.log(`User ${meta.name} found.`);
    });
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
