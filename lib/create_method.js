'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	, fs = require('fs')
	, path = require('path')
	
	/* NPM */
	, noda = require('noda')
	, undertake = require('undertake')
	, isGenerator = require('jinang/isGenerator')
	
	/* in-package */
	, Agent = noda.inRequire('class/GitlabAgent')
	;

module.exports = function(dirname, returnArray) {
	let exec = function*(fn /*, ... */) {
		let args = Array.from(arguments).slice(1);
		let ret = fn.apply(null, args);
		return isGenerator(ret) ? yield ret : ret;
	};

	return function(options, _agent) {
		if (_agent) {
			// DO NOTHING.
		}
		else if (this && this.agent instanceof Agent) {
			_agent = this.agent;
		}
		else {
			_agent = Agent.getOne(options);
		}
		
		return undertake(function*() {
			let data;			
			
			PARSE_OPTIONS: {
				let pathname = path.join(dirname, 'parse_options.js');
				if (require.cache[pathname] || fs.existsSync(pathname)) {
					options = yield exec(require(pathname), _agent, options);
					if (options == null) {
						return returnArray ? [] : null;
					}
				}
			}

			RUN: {
				let pathname = path.join(dirname, _agent.version + '.js');
				if (require.cache[pathname] || fs.existsSync(pathname)) {
					data = yield exec(require(pathname), _agent, options);
				}
				else {
					let name = path.basename(dirname);
					throw new Error(`API ${_agent.version} not accepted by method ${name}`);
				}
			}

			FORMAT: {
				let pathname = path.join(dirname, 'format.js');
				if (require.cache[pathname] || fs.existsSync(pathname)) {
					data = yield exec(require(pathname), _agent, options, data);
				}
			}

			if (data == null && returnArray) data = [];
			return data;
		});
	};
};