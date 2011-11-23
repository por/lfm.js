var callback = function(response) {
  if (response.error) {
    ok(false, response.message);
  } else {
    ok(true);
  }
  start();
};

var _get = function () {
  // Async, so pause the test first
  stop();
  LFM.get.apply(null, arguments);
};

// API credentials for Last.fm user `lfm.js`
LFM.init({
  key: '9fe3cf896fce09f18379f94a058074ce',
  secret: 'ee685b5768b34751c1776bdef60ceb2c'
});

test('API user.getInfo', function() { _get('user.getInfo', {user: 'por'}, callback); });
test('API artist.getInfo', function() { _get('artist.getInfo', {artist: 'radiohead'}, callback); });
test('API geo.getEvents', function() { _get('geo.getEvents', {}, callback); });