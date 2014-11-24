exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	// this is the order they need to run in :(
	specs: ['spec/e2e/controllers/main.js', 
			'spec/e2e/controllers/add-journey.js',
			'spec/e2e/controllers/edit-journey.js'],
	capabilities: {
	    browserName: 'chrome',
	    shardTestFiles: false
  	}
};