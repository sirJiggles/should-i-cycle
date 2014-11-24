exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['spec/e2e/controllers/main.js', 'spec/e2e/controllers/add-journey.js'],
	capabilities: {
	    browserName: 'chrome',
	    shardTestFiles: false
  	}
};