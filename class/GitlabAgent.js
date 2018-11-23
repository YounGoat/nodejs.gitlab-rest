'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, url = require('url')
	
	/* NPM */
	, noda = require('noda')
	, parseOptions = require('jinang/parseOptions')
	, SimpleAgent = require('htp/SimpleAgent')	

	/* in-package */
	, conf = noda.inRequire('conf')

	/* in-file */
	, md5 = content => require('crypto').createHash('md5').update(content).digest('hex')
	;

const _instances = {};

class GitlabAgent extends SimpleAgent {
	
	/**
	 * @param  {object}   api
	 * @param  {string}  [api.endpoint]
	 * @param  {string}  [api.version]
	 * @param  {string}  [api.access_token]
	 * @param  {string}  [api.private_token]
	 */
	constructor(api) {
		
		let endPoint = 'https://gitlab.com/api/v4';
		let version = 'v4';
		let headers = {};
		
		if (api.endpoint) {
			endPoint = api.endpoint;
		}

		if (api.version) {
			version = api.version;
		}
		else {
			let pathname = url.parse(endPoint).pathname;
			if (/^\/api\/(v3|v4)$/.test(pathname)) {
				version = RegExp.$1;
			}
		}

		if (api.access_token) {
			headers.Authorization = `Bearer ${api.access_token}`;
		}

		if (api.private_token) {
			headers['PRIVATE-TOKEN'] = api.private_token;
		}

		let beforeCallback = (err, response) => {
			if (err) throw err;

			let errorName, errorMsg, code = response.statusCode;
			if (code >= 500) {
				errorName = 'server error';
			}
			else if (code < 200 || code >= 300) {
				errorName = 'unexpected server response';
			}
			if (errorName) {
				let errorMsg = response.body && response.body.message ? response.body.message : response.statusMessage;
				throw new Error(`${errorName}: ${code}, ${errorMsg}`);
			}

			if (code == 404) {
				return null;
			}
			else if (response.body instanceof Array && response.headers['x-page']) {
				return {
					page        : response.headers['x-page'],
					next_page   : response.headers['x-next-page'],
					prev_page   : response.headers['x-prev-page'],
					per_page    : response.headers['x-per-page'],
					total       : response.headers['x-total'],
					total_pages : response.headers['x-total-pages'],
					items       : response.body,					
				};
			}
			else if (typeof response.body != 'string') {
				return response.body;
			}
			else {
				return response.bodyBuffer;
			}
		};

		let agentOptions = {
			endPoint,
			headers,
			beforeCallback,
		};

		super(agentOptions);
		this.version = version;
	}
}

GitlabAgent.getOne = function(options) {
	// 这种设计，是为了规避方法文件和主类文件之间的递归引用（require），实属无奈之举。
	if (this && this.__proto__.classId == noda.inRequire('class.id')) {
		return this.agent;
	}
	
	const po = parseOptions(options.api ? options.api : options, {
		explicit: true,
		caseSensitive: false,
		keepNameCase: false,
		columns: [
			'endpoint alias(end_point)',
			'version',
			'access_token alias(oauth_token, oauth2_token, authorization)',
			'private_token alias(personal_access_token)',
		],
	});

	// Trim the tailing slash in endpoint.
	if (po.endpoint) {
		po.endpoint = po.endpoint.replace(/\/$/, '');
	}

	let digest = md5(JSON.stringify(po));
	let agent = _instances[digest];
	if (!agent) {
		agent = new GitlabAgent(po);
		_instances[digest] = agent;
	}
	return agent;
};

module.exports = GitlabAgent;