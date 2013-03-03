

sw: 43.555515  -70.431976
ne: 43.777044  -70.193024

flickr.photos.getRecent

api_key

extras (Optional)
A comma-delimited list of extra information to fetch for each returned record.

Currently supported fields are:
description,
license,
date_upload,
date_taken,
owner_name,
icon_server,
original_format,
last_update,
geo,
tags,
machine_tags,
o_dims,
views,
media,
path_alias,
url_sq,
url_t,
url_s,
url_q,
url_m,
url_n,
url_z,
url_c,
url_l,
url_o
per_page (Optional)
Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500.
page (Optional)
The page of results to return. If this argument is omitted, it defaults to 1.

<photos page="2" pages="89" perpage="10" total="881">
  <photo id="2636" owner="47058503995@N01"
    secret="a123456" server="2" title="test_04"
    ispublic="1" isfriend="0" isfamily="0" />
  <photo id="2635" owner="47058503995@N01"
    secret="b123456" server="2" title="test_03"
    ispublic="0" isfriend="1" isfamily="1" />
  <photo id="2633" owner="47058503995@N01"
    secret="c123456" server="2" title="test_01"
    ispublic="1" isfriend="0" isfamily="0" />
  <photo id="2610" owner="12037949754@N01"
    secret="d123456" server="2" title="00_tall"
    ispublic="1" isfriend="0" isfamily="0" />
</photos>

URL: http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=95f41bfa4faa0f43bf7c24795eabbed4&format=json&nojsoncallback=1





URL: http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=95f41bfa4faa0f43bf7c24795eabbed4&extras=geo%2C+description%2C+original_format%2C+url_t&per_page=5&format=json&nojsoncallback=1

{ "photos": { "page": 1, "pages": "200", "perpage": 5, "total": "1000",
    "photo": [
      { "id": "8495004263", "owner": "54498815@N02", "secret": "f332fa3be8", "server": "8530", "farm": 9, "title": "03Jun2012 42", "ispublic": 1, "isfriend": 0, "isfamily": 0,

      "latitude": 0,
      "longitude": 0,
      "accuracy": 0,
      "context": 0,

        "description": { "_content": "" }, "originalsecret": "cec100ae0d", "originalformat": "jpg", "url_t": "http:\/\/farm9.staticflickr.com\/8530\/8495004263_f332fa3be8_t.jpg", "height_t": 100, "width_t": 67 },


      { "id": "8495004457", "owner": "36693277@N02", "secret": "68e9422c91", "server": "8089", "farm": 9, "title": "MU_MoveInDay_157 TBV_9698", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "" }, "originalsecret": "3718b0141e", "originalformat": "jpg", "url_t": "http:\/\/farm9.staticflickr.com\/8089\/8495004457_68e9422c91_t.jpg", "height_t": 66, "width_t": 100 },
      { "id": "8495004659", "owner": "85349274@N06", "secret": "4e4357f054", "server": "8387", "farm": 9, "title": "DSC07521", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "" }, "originalsecret": "6536ffa84a", "originalformat": "jpg", "url_t": "http:\/\/farm9.staticflickr.com\/8387\/8495004659_4e4357f054_t.jpg", "height_t": 67, "width_t": 100 },
      { "id": "8495004671", "owner": "93379213@N06", "secret": "8efac5ef24", "server": "8516", "farm": 9, "title": ".", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": ".\n" }, "url_t": "http:\/\/farm9.staticflickr.com\/8516\/8495004671_8efac5ef24_t.jpg", "height_t": 75, "width_t": 100 },
      { "id": "8496108102", "owner": "86492688@N02", "secret": "71031672fa", "server": "8105", "farm": 9, "title": "Ann Billingsley  125", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "" }, "originalsecret": "e5d1085768", "originalformat": "jpg", "url_t": "http:\/\/farm9.staticflickr.com\/8105\/8496108102_71031672fa_t.jpg", "height_t": 67, "width_t": 100 }
    ] }, "stat": "ok" }

(JSONP) :
jsonFlickrApi({ "photos": { "page": 1, "pages": "200", "perpage": 5, "total": "1000",
    "photo": [
      { "id": "8495006079", "owner": "24942531@N02", "secret": "8e266c06ed", "server": "8096", "farm": 9, "title": "DISCO 2012-216.jpg", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "" }, "originalsecret": "4320be0e45", "originalformat": "jpg", "url_t": "http:\/\/farm9.staticflickr.com\/8096\/8495006079_8e266c06ed_t.jpg", "height_t": 100, "width_t": 67 },
      { "id": "8496109610", "owner": "54617725@N07", "secret": "4b5d9d7db7", "server": "8112", "farm": 9, "title": "Étampes 91", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "Mattebox 2.0\niPhone 4" }, "url_t": "http:\/\/farm9.staticflickr.com\/8112\/8496109610_4b5d9d7db7_t.jpg", "height_t": 100, "width_t": 100 },
      { "id": "8496109626", "owner": "21314403@N00", "secret": "ec9a44e972", "server": "8505", "farm": 9, "title": "2013-02-21 08.19.13", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "" }, "originalsecret": "4b5d9d7db7", "originalformat": "jpg", "url_t": "http:\/\/farm9.staticflickr.com\/8505\/8496109626_ec9a44e972_t.jpg", "height_t": 100, "width_t": 75 },
      { "id": "8496109672", "owner": "87129337@N07", "secret": "b0b7a1f41f", "server": "8251", "farm": 9, "title": "Washington DC Engagement - Cindy & Jason-369-Edit.jpg", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "" }, "url_t": "http:\/\/farm9.staticflickr.com\/8251\/8496109672_b0b7a1f41f_t.jpg", "height_t": 67, "width_t": 100 },
      { "id": "8496109678", "owner": "88027031@N05", "secret": "44f1b9e3d4", "server": "8251", "farm": 9, "title": "IMG_4445", "ispublic": 1, "isfriend": 0, "isfamily": 0, "latitude": 0, "longitude": 0, "accuracy": 0, "context": 0,
        "description": { "_content": "" }, "url_t": "http:\/\/farm9.staticflickr.com\/8251\/8496109678_44f1b9e3d4_t.jpg", "height_t": 56, "width_t": 100 }
    ] }, "stat": "ok" })



