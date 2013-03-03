(function() {

Em = Ember;
App = Em.Application.create();



})();

(function() {

App.FlickrAdapter = DS.RESTAdapter.extend({

  serializer: App.FlickrSerializer.create(),

  url: "https://secure.flickr.com/services/rest/",

  // Don't do it. Just don't. It means nothing in the context of Flickr
  // and it'll make you go blind.
  find: null,
  findAll: null,

  // Override DS.Adapter.didFindQuery only so that we can change the
  // loader.populateArray function. Unfortunately, we can't just twiddle
  // the populateArray function and let _super do the work. A hook would be nice.
  didFindQuery: function(store, type, payload, recordArray) {
    var loader = DS.loaderFor(store);

    loader.populateArray = function(data) {
      // ========================================
      // Here's the only difference!
      //
      if (type.toString() === 'App.Photo') {
        if (data.photos && data.page) {
          recordArray.set('page', data.page);
        }
        data = data.photos;
      }
      // ========================================
      recordArray.load(data);
    };

    get(this, 'serializer').extractMany(loader, payload, type);
  }

  // Need to duplicate this from ember-data/lib/adapters/rest_adapter.js
  // so that we can pull ContentType out of the request headers for flickr.
  // Also, it lets us tack on the queryArgs
  ajax: function(url, type, hash) {
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    // hash.contentType = 'application/json; charset=utf-8';
    hash.context = this;

    if (hash.data && type != 'GET') {
      hash.data = JSON.stringify(hash.data);
    }

    jQuery.ajax(hash);
  },

  buildURL: function(record, suffix) {
    return this.url;
  }

});

// Need this or the serializer won't work.
App.FlickrAdapter.map('App.Photo', {});


})();

(function() {

App.FlickrModel = DS.Model.extend({});

App.FlickrModel.reopenClass({
  api_key: 'f9a3a8cbe838942e08ce5269507f56ca',
  format: 'json',
  nojsoncallback: '1',

  _query: function(query) {
    var query = query || {};
    query.format = 'json';
    query.nojsoncallback = '1';
    query.api_key =  this.api_key;

    query.extras = 'url_sq,url_t,geo'

    return query;
  }

});


})();

(function() {

App.FlickrSerializer = DS.JSONSerializer.extend({

  init: function(){
    this._super();
    // this.configure({meta: 'stat'});
  },

//   extractMany: function(loader, json, type, records) {
//     if (type.toString() === 'App.Photo') {
// //       json['photos']["page"];
// // "photos": { "page": 1, "pages": 16, "perpage": 100, "total": "1586",

//       return this._super(loader, { photos: json['photos']['photo'] }, type, records);
//     }

//     return this._super(loader, json, type, records);
//   }

})


})();

(function() {

App.Photo = App.FlickrModel.extend({
  title:      DS.attr('string'),
  owner:      DS.attr('string'),
  secret:     DS.attr('string'),
  server:     DS.attr('string'),
  farm:       DS.attr('number'),
  url_sq:     DS.attr('string'),
  height_sq:  DS.attr('number'),
  width_sq:   DS.attr('number'),
  url_t:      DS.attr('string'),
  height_t:   DS.attr('number'),
  width_t:    DS.attr('number')
});


App.Photo.reopenClass({

  getRecent: function(query) {
    var query = this._query(query);
    query.method = 'flickr.photos.getRecent';

    return this.find(this._query(query));
  },

  getGetty: function(query) {
    var query = this._query(query);
    query.is_getty = true;
    query.method = 'flickr.photos.search';

    return this.find(query);
  },

  search: function(query) {
    // getting search critier from the UI and making sure they're
    // formatted such that flickr can read them.

    var query = this._query(query);

    // query.bbox = '-70.4319,43.5555,-10.193,43.777';
    // query.min_upload_date = '2013-01-01 00:00:00';

    query.method = 'flickr.photos.search';

    return this.find(query);
  }

});


})();

(function() {

// noop


})();

(function() {

App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.FlickrAdapter.create()
});


})();