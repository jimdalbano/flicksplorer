App.TwoRoute = Em.Route.extend({
  setupController: function(controller, model) {
    var data = new App.RecentPhotos();
    controller.set('content', data);
  }
});
