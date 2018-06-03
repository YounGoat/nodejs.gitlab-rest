'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , assert = require('assert')

    /* NPM */
    , noda = require('noda')
    
    /* in-package */
    , findObjects = noda.inRequire('findObjects')
    , token = noda.inRead('token', 'ascii')
    ;

findObjects({ 
    private_token: token,
    project_id: 5536162,
    path: '',
    // branch: 'master',
    // tag: 'BEGIN',
    commit: '56acd6386144871c824447b6585cd7932de9df29',
    recursive: true,
})
.then(metas => {
    console.log('-- SUCCESS --');
    console.log(metas);
}).catch(err => {
    console.log('-- ERROR --');
    console.log(err);
});
