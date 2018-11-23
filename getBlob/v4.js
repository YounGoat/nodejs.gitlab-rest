/**
 * @see https://gitlab.com/gitlab-org/gitlab-ce/blob/11-4-stable/doc/api/repositories.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    , path = require('path')
    
    /* NPM */
    , modifyUrl = require('jinang/modifyUrl')
    , noda = require('noda')

    /* in-package */
    , findObjects = noda.inRequire('findObjects')
    ;

module.exports = function*(_agent, options) {
    // ---------------------------
    // Get Blob Id.

    let content = null;

    let blobId = null;
    GET_BLOB_SHA: {
        let options2 = Object.assign({}, options);
        options2.path = path.dirname(options.path);
        let metas = yield findObjects(options2);

        let name = path.basename(options.path);
        metas.find(meta => {
            if (meta.name == name) {
                blobId = meta.id;
                return true;
            }
        });
    }

    // ---------------------------
    // Get Blob Content.

    if (blobId) {
        let urlname = `/projects/${options.project_id}/repository/blobs/${blobId}/raw`;
        content = yield _agent.get(urlname);
    }

    return content;
};