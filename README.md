#	gitlab-rest
__GitLab API based on offical API v3/v4__

>	If links in this document not avaiable, please access [README on GitHub](./README.md) directly.

##  Description

##	Get Started

###	Class

```javascript
const API = require('gitlab-rest');

let rest = new API({ private_token: 'personal-access-token' });

rest.whoami()
    .then(info => {
        // ...
    })
    .catch(err => {
        // ...
    });
```

###	Standalone Function

```javascript
const whoami = require('gitlab-rest/whoami');
whoami({ private_token: 'personal-access-token' })
    .then(info => {
        // ...
    })
    .catch(err => {
        // ...
    });
```

##	API

*	Class __Rest__({ *private_token* })
*	Promise(Object[]) __\<rest\>.findGroups__(Object *options*)
*	Promise(Object[]) __\<rest\>.findObjects__(Object *options*)
*	Promise(Object[]) __\<rest\>.findProjects__(Object *options*)
*	Promise(Object[]) __\<rest\>.findUsers__(Object *options*)
*	Promise(Object) __\<rest\>.getBlob__(Object *options*)
*	Promise(Object) __\<rest\>.getGroup__(Object *options*)
*	Promise(Object) __\<rest\>.getProject__(Object *options*)
*	Promise(Object) __\<rest\>.getUser__(Object *options*)
*	Promise(Object) __\<rest\>.whoami__()

All methods are asynchronous and will return instances of `Promise`. Hereafter, *response* means what to be obtained in `.then((response) => { /* ... */ })`.

All methods may be required and invoked by itself as what we see in [Get Started, Standalone Function](#standalone-function).

##  Examples

Before execute the examples, please replace the `private_token` with your own personal access token.

*	[findGroups](./example/findGroups.js)
*	[findObjects](./example/findObjects.js)
*	[findProjects](./example/findProjects.js)
*	[findUsers](./example/findUsers.js)
*	[getBlob](./example/getBlob.js)
*	[getGroup](./example/getGroup.js)
*	[getProject](./example/getProject.js)
*	[getUser](./example/getUser.js)
*	[whoami](./example/whoami.js)