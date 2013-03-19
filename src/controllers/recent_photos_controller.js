App.RecentPhotosController = Em.ArrayController.extend({

  page: function() {
    return this.get('content.page');
  }.property('content.page'),

  perPage: function() {
    return this.get('content.perPage');
  }.property('content.perPage'),

  total: function() {
    return this.get('content.total');
  }.property('content.total'),

  nextPage: function() {
    var content = this.get('content'),
        currPage = this.get('page');
    this.set('loading', true);
    content.loadNextPage()
    this.set('loading', false);
  }
});
