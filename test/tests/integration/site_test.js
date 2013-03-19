var casper = require('casper').create();

casper.start('http://localhost:8000/index.html', function() {
  this.test.assertUrlMatches(/index.html$/, 'Router did not shuffle us off somewhere');
  this.test.assertSelectorExists('#app', 'The app has a place to live');
});

casper.run(function() {
    this.test.done();
    this.test.renderResults(true);
});
