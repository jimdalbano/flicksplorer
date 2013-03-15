Ember.testing = true;

// beforeEach(function(){
//   server = this.server = sinon.fakeServer.create();
//   server.respondWith(/^.*\/sites.*/, function(request) {
//     console.log("respondWith", arguments);
//     request.respond(200, {"Content-Type": "application/json;"}, '{"items": [{"site_type":"main_site","name":"Stack Overflow","logo_url":"http://cdn.sstatic.net/stackoverflow/img/logo.png","api_site_parameter":"stackoverflow","site_url":"http://stackoverflow.com","audience":"professional and enthusiast programmers","icon_url":"http://cdn.sstatic.net/stackoverflow/img/apple-touch-icon.png","aliases":["http://www.stackoverflow.com"],"site_state":"normal","styling":{"link_color":"#0077CC","tag_foreground_color":"#3E6D8E","tag_background_color":"#E0EAF1"}]}');
//   });
// });

window.lookupStore = function(){
  return App.__container__.lookup('store:main');
};

window.lookupController = function(name){
  return App.__container__.lookup('controller:' + name);
};

var server;

beforeEach(function(){
  Ember.run(function() {
    App.reopen({
      LOG_TRANSITIONS: true
    });
    App.Router.reopen({
      location: 'none'
    });
    App.reset();
  });
});

// http://sinonjs.org/docs/#fakeServer
beforeEach(function(){
  this.server = sinon.fakeServer.create();
});

afterEach(function() {
  this.server.restore();
});
