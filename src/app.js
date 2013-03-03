Em = Ember;
App = Em.Application.create();

require('src/flickr/flickr');
require('src/store');


require('src/controllers/recent_photos_controller');

require('src/router');
