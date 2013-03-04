(function() {

Em = Ember;
App = Em.Application.create();



})();

(function() {





})();

(function() {

App.FlickrSerializer = DS.JSONSerializer.extend({

  init: function(){
    this._super();
    this.configure({meta: 'stat'});
  }
})


})();

(function() {

var get = Ember.get, set = Ember.set

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
        recordArray.set('perPage', payload.photos.perpage);
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
App.FlickrAdapter.map('App.Photo', {});


})();

(function() {

App.FlickrModel = DS.Model.extend({});

App.FlickrModel.reopenClass({
  format: 'json',
  nojsoncallback: '1',

  _query: function(query) {
    var query = query || {};
    query.format = this.format;
    query.nojsoncallback = this.nojsoncallback;
    query.api_key =  App.FlickrAPIKey;

    query.extras = 'url_sq,url_t,geo'

    return query;
  }

});


})();

(function() {

App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.FlickrAdapter.create()
});


})();

(function() {

App.RecentPhotosController = Em.ArrayController.extend({

  page: function() {
    return this.get('content.page');
  }.property('content.page'),

  perPage: function() {
    return this.get('content.perPage');
  }.property('content.perPage')

});


})();

(function() {

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


})();

(function() {

App.FlickrAPIKey = 'f9a3a8cbe838942e08ce5269507f56ca';


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
    var query = this._query(query), results;
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