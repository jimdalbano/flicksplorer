require('app');

App.Store = DS.Store.extend({
  revision: 12,
  adapter: App.FlickrAdapter.create()
});
