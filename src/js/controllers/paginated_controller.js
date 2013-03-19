require('/app');

App.PaginatedController = Em.ArrayController.extend({
  page: function() {
    return this.get('content.page');
  }.property('content.page'),

  perPage: function() {
    return this.get('content.perPage');
  }.property('content.perPage'),

  total: function() {
    return this.get('content.total');
  }.property('content.total'),

  nextPage: Ember.K
})
