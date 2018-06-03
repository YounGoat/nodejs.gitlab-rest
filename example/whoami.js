'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , whoami = noda.inRequire('whoami')
    , token = noda.inRead('token', 'ascii')
    ;

whoami({ 
    private_token: token,
})
.then(meta => {
    console.log('-- SUCCESS --');
    console.log(meta);
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
