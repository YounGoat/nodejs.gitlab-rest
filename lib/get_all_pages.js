'use strict';

const MODULE_REQUIRE = 1
	/* built-in */
	
	/* NPM */
	, modifyUrl = require('jinang/modifyUrl')
	
	/* in-package */
	;

module.exports = function*(_agent, urlname) {
	let page = 1;
	let per_page = 100; /* default 20, max 100 */
	
	let items = [];
	do {
		urlname = modifyUrl.query(urlname, { page, per_page });
		let data = yield _agent.get(urlname);
		items = items.concat(data.items);

		if (data.page >= data.total_pages) {
			break;
		}
		else {
			page++;
		}
	} while(1)

	return items;
}
