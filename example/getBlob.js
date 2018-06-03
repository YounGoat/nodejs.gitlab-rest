'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')
    , fs = require('fs')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , getBlob = noda.inRequire('getBlob')
    , token = noda.inRead('token', 'ascii')
    ;

getBlob({ 
    private_token: token,
    project_id: 5536162,
    path: 'README.md',
    branch: 'release',
    // tag: 'BEGIN',
    // commit: '56acd6386144871c824447b6585cd7932de9df29',
    // recursive: true,
})
.then(content => {
    console.log('-- SUCCESS --');
    console.log(content.toString());
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
