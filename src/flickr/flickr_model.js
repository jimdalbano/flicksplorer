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
