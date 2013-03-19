App.OneRoute = Em.Route.extend({
  setupController: function(controller, model) {
    controller.set('content', this.get('store').filter(App.Photo, function(photo){ return true;}));
  }
})
