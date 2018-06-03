'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , getGroup = noda.inRequire('getGroup')
    , token = noda.inRead('token', 'ascii')
    ;

getGroup({ 
    id: '2952480',
    private_token: token,
})
.then(meta => {
    console.log('-- SUCCESS --');
    console.log(meta);
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
