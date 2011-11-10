window.LFM = window.LFM || (function() {
  var apiKey = null;
  var apiSecret = null;
  var apiRoot = 'http://ws.audioscrobbler.com/2.0/?format=json';
  var apiAuthUrl = 'http://www.last.fm/api/auth';

  var session = null;

  // Method that gets called after LFM.login()
  var authCallback = null;

  // Make an api request
  var api = function(method, type, params, callback) {
    var data = {
      'api_key': apiKey,
      'method': method
    };
    data = mergeObjects(data, params);
    if (session) {
      data.sk = session.key;
    }
    data.api_sig = getApiSignature(data);
    
    data = parameterise(data);
    var url = apiRoot;
    var m = (type || 'GET').toUpperCase();
    if (m === 'GET') {
      url += '&' + data;
    }
    var http_request = new XMLHttpRequest();
    http_request.open(m, url, true);
    if (m === 'POST') {
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.setRequestHeader("Content-length", data.length);
      http_request.setRequestHeader("Connection", "close");
    }
    http_request.onreadystatechange = function () {
      var done = 4, ok = 200;
      if (http_request.readyState == done && http_request.status == ok) {
        callback(JSON.parse(http_request.responseText));
      }
    };
    http_request.send((m==='POST')?data:null);

  };

  // Sign api request
  var getApiSignature = function(params) {
    var keys   = [];
    var string = '';
    for(var key in params){
      keys.push(key);
    }
    keys.sort();
    for(var index in keys){
      var k = keys[index];
      string += k + params[k];
    }
    string += apiSecret;
    return LFM.md5(string);
  };

  // Get/set data
  var Data = {
    get: function(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    set: function(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    del: function(key) {
      localStorage.removeItem(key);
    }
  };

  // Create a serialized representation of an object
  var parameterise = function(params){
    var a = [];
    for(var name in params){
      if(params.hasOwnProperty(name)){
        a.push(name + "=" + escape(params[name]));
      }
    }
    return a.join("&");
  };

  // Parse DOMWindow.location object
  var parseLocation = function(location) {
    var splitted = (location.search + location.hash).split(/[&?#]/);
    var obj = {};
    for(var i in splitted){
      var kv = splitted[i].split("=");
      if(kv[0]){
        obj[kv[0]] = unescape(kv[1]);
      }
    }
    return obj;
  };
  
  // Merge two objects
  var mergeObjects = function(obj1,obj2) {
    var obj3 = {};
    for (var attrname1 in obj1) { obj3[attrname1] = obj1[attrname1]; }
    for (var attrname2 in obj2) { obj3[attrname2] = obj2[attrname2]; }
    return obj3;
  };

  return {
    init: function(options) {
      apiKey = options.key;
      apiSecret = options.secret || null;
      session = Data.get('session');
    },
    getSession: function() {
      return session;
    },
    login: function(callback) {
      authCallback = callback;
      var url = apiAuthUrl + '?' + parameterise({
        api_key: apiKey,
        cb: 'http://localhost/html5-radio/callback.html'
      });
      window.open(url, 'lastfmLogin', 'height=600,width=980');
    },
    logout: function(callback) {
      Data.del('session');
      callback();
    },
    loginCallback: function() {
      var popup = window.open("", "lastfmLogin");
      var params = parseLocation(popup.location);
      popup.close();
      if (params.token) {
        // get session
        api('auth.getSession', 'post', {token: params.token}, function(response) {
          Data.set('session', response.session);
        });
      }
      authCallback();
    },
    api: api
  };
}());