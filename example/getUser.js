'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , getUser = noda.inRequire('getUser')
    , token = noda.inRead('token', 'ascii')
    ;

getUser({ 
    id: '2043928',
    private_token: token,
})
.then(meta => {
    console.log('-- SUCCESS --');
    console.log(meta);
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
