Em = Ember;
App = Em.Application.create({
  rootElement: '#app'
});

require('src/flickr/flickr');
require('src/store');


require('src/routes/router');
require('src/misc/recent_photos');
