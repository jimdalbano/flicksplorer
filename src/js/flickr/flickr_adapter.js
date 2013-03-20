require('flickr/flickr');
require('flickr/flickr_serializer');

var get = Ember.get, set = Ember.set;

App.FlickrAdapter = DS.RESTAdapter.extend({

  serializer: App.FlickrSerializer.create(),

  url: "https://secure.flickr.com/services/rest/",

  // Don't do it. Just don't. It means nothing in the context of Flickr.
  find: null,
  findAll: null,

  // Override DS.Adapter.didFindQuery only so that we can change the
  // loader.populateArray function. Unfortunately, we can't just twiddle
  // the populateArray function and let _super do the work. A hook would be nice.
  didFindQuery: function(store, type, payload, recordArray) {
    var loader = DS.loaderFor(store);

    // ========================================
    // Here's the only difference!
    //
    if (type.toString() === 'App.Photo') {
      if (payload.stat === 'ok') {
      // if (payload.photos && payload.photos.page) {
        recordArray.set('page', payload.photos.page);
        recordArray.set('per_page', payload.photos.perpage);
        recordArray.set('pages', payload.photos.pages);
        recordArray.set('total', payload.photos.total);
      }
      payload = { 'photos' : payload.photos.photo };
    }
    // ========================================

    loader.populateArray = function(data) {
      // recordArray.load(data);
      data.forEach(function(item, index, enumerable){
        this.addReference(item);
      }, recordArray);
    };

    get(this, 'serializer').extractMany(loader, payload, type);
  },

  // Override DS.RESTAdapter so that we can pull ContentType out of the request
  // headers for flickr. Flicker doesn't seem to like it for CORS requests.
  ajax: function(url, type, hash) {
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    // This is the header flicker won't accept for a CORS request.
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

// Need this or the serializer won't know what's going on.
App.FlickrAdapter.map('App.Photo', {meta: 'stat'});
