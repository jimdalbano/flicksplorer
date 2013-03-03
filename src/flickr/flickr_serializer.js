App.FlickrSerializer = DS.JSONSerializer.extend({

  init: function(){
    this._super();
    this.configure({meta: 'stat'});
  }
})
