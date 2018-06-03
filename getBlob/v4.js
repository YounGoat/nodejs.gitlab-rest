/**
 * @see
 *   GitLab API
 *   https://gitlab.com/help/api/README.md
 *   Now the version is v4.
 *   
 *   Repositories API
 *   https://gitlab.com/help/api/repositories.md
 */

'use strict';

const MODULE_REQUIRE = 1
    /* built-in */
    
    /* NPM */
    , modifyUrl = require('jinang/modifyUrl')
    , undertake = require('undertake')
    ;

module.exports = function getBlob(_agent, po) {
    return undertake(function*() {
        
        // ---------------------------
        // Get Blob Id.

        let content = null;
        let blob_id = null;
        GET_BLOB_SHA: {
            let blobname = null;
            let queries = {};
            if (po.path) {
                // Trim the leading slash.
                let pathname = po.path.replace(/^\//, '');

                // Keep the basename and query the dirname.
                let names = pathname.split('/');
                blobname = names.pop();
                queries.path = names.join('/');
            }

            if (po.ref) {
                queries.ref = po.ref;
            }

            let urlname = modifyUrl.query(`/projects/${po.project}/repository/tree`, queries);
            let objectMetas = yield _agent.get(urlname);
            let meta = objectMetas.find(meta => meta.name == blobname);
            if (meta) blob_id = meta.id;
        }

        // ---------------------------
        // Get Blob Content.

        if (blob_id) {
            let urlname = `/projects/${po.project}/repository/blobs/${blob_id}/raw`;
            content = yield _agent.get(urlname);
        }

        return content;
    });
};