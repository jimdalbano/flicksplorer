App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.FlickrAdapter.create()
});