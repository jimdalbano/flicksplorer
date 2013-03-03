App.RecentPhotosController = Em.ArrayController.extend({

  page: function() {
    return this.get('content.page');
  }.property('content.page'),

  perPage: function() {
    return this.get('content.perPage');
  }.property('content.perPage')

});
