App.Router.map(function() {
  this.resource('recent_photos');
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('recent_photos');
  }
});


App.RecentPhotosRoute = Em.Route.extend({
  setupController: function(controller, model) {
    controller.set('content', App.Photo.getRecent({page: 1, per_page: 10}));
  },
  renderTemplate: function() {
    this.render('recent_photos/index');
  }
})
