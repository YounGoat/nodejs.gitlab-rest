#	gitlab-rest
__GitLab API based on offical API v3/v4__

>	If links in this document not avaiable, please access [README on GitHub](./README.md) directly.

##  Table of Contents

* [Get Started](#get-started)
	* [Class](#class)
	* [Standalone Function](#standalone-function)
* [API](#api)
	* [Class Rest](#class-rest)
	* [downloadProject()](#downloadproject)
	* [findGroups()](#findgroups)
	* [findObjects()](#findobjects)
	* [findProjects()](#findprojects)
	* [getBlob()](#getblob)
	* [getGroup()](#getgroup)
	* [getProject()](#getproject)
	* [getUser()](#getuser)
	* [whoAmI()](#whoami)
	* [whoIsThat()](#whoisthat)
* [FAQ](#faq)
* [References](#references)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/dns-agent)

##	Get Started

###	Class

```javascript
const API = require('gitlab-rest');

let rest = new API({ private_token: 'personal-access-token' });

rest.whoAmI()
    .then(info => {
        // ...
    })
    .catch(err => {
        // ...
    });
```

###	Standalone Function

```javascript
const whoAmI = require('gitlab-rest/whoAmI');
whoAmI({ private_token: 'personal-access-token' })
    .then(info => {
        // ...
    })
    .catch(err => {
        // ...
    });
```

##	API

This module is made up of one class and a number of methods which may be members or standalone.

All methods are asynchronous and will return instances of `Promise`. Hereafter, *response* means what to be obtained in `.then(response => { /* ... */ })`.

All methods may be required and invoked by itself as what we see in [Get Started, Standalone Function](#standalone-function). Actually, if a method is invoked by itself, an instance of class `Rest` will be created implicitly. In such cases, necessary info required by constructor of class `Rest` should occur in object `options` or `options.api` with the same names.

### Class Rest

*	Class __Rest__(Object *api*)  
    To create an instance of gitlab RESTful API.
    -   *string* __api.endpoint__ OPTIONAL DEFAULT
    -   *string* __api.version__ OPTIONAL
    -   *string* __api.access_token__ OPTIONAL
    -   *string* __api.private_token__ OPTIONAL


### downloadProject()

*	Promise(true) [\<rest\>].__downloadProject__(Object *options*)  
    To obtain meta data of matching groups.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.namespace__ OPTIONAL
    -   *string* __options.project_name__ OPTIONAL
    -   *string* __options.project_id__ OPTIONAL
    -   *string* __options.path__
    -   *string* __options.ref__ OPTIONAL
    -   *string* __options.target__

### findGroups()

*	Promise(Object[]) [\<rest\>].__findGroups__(Object *options*)  
    To obtain meta data of matching groups.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.search__ OPTIONAL

### findObjects()

*	Promise(Object[]) [\<rest\>].__findObjects__(Object *options*)  
    To obtain meta data of matching objects / files.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.project_id__
    -   *string* __options.path__ OPTIONAL
    -   *string* __options.ref__ OPTIONAL  
    -   *boolean* __options.recursive__ OPTIONAL  

### findProjects()

*	Promise(Object[]) [\<rest\>].__findProjects__(Object *options*)  
    To obtain meta data of matching projects.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.username OPTIONAL
    -   *string* __options.group_id OPTIONAL

### getBlob()

*	Promise(Object) [\<rest\>].__getBlob__(Object *options*)  
    To obtain blob data of specified object / file.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.namespace__ OPTIONAL  
    -   *string* __options.project_name__ OPTIONAL  
    -   *string* __options.project_id__ OPTIONAL  
    -   *string* __options.path__  
    -   *string* __options.ref__ OPTIONAL  

### getGroup()

*	Promise(Object) [\<rest\>].__getGroup__(Object *options*)  
    To obtain details of specified group.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.id__

### getProject()

*	Promise(Object) [\<rest\>].__getProject__(Object *options*)  
    To obtain details of specified project.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.id__
    

### getUser()

*	Promise(Object) [\<rest\>].__getUser__(Object *options*)  
    To obtain details of specified user.
    -   *object* __options.api__ OPTIONAL
    -   *string* __options.id__

### whoAmI()

*	Promise(Object) [\<rest\>].__whoAmI__(Object *options*)  
    To obtain details of user who owns the token used.
    -   *object* __options.api__ OPTIONAL

### whoIsThat()

*	Promise(Object) [\<rest\>].__whoIsThat__(Object *options*)  
    To obtain details of GitLab server.
    -   *object* __options.api__ OPTIONAL


## FAQ

*   What is __namespace__?  
    Usernames and groupnames fall under a special category called namespaces.

*   What is __ref__?  
    It may be __commit__ (somebody gets used to call it "commit id"), __branch__ or __tag__.

##  References

*   [GitLab API (current)](https://gitlab.com/help/api/README.md)
*   [GitLab API (v4, 0.11.4)](https://gitlab.com/gitlab-org/gitlab-ce/blob/11-4-stable/doc/api/README.md)
*   [GitLab API (v3, deprecated)](https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/README.md)
