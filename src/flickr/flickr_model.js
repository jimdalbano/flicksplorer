require('src/flickr/flickr_api_key');

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
