# LFM.js – A Last.fm  Javascript SDK

LFM.js allows you to easily integrate the Last.fm API into your website. It offers:

* a basic authentication flow
* an easy way to make GET and POST requests
* scrobbling (soon)

## Getting Started

Add the following script to your HTML and use your own Last.fm API key. The 'secret' and 'callback_uri' parameters are both optional, but you will need them if you want to use authentication. The ```callback.html``` can be found in the ```src``` directory. It doesn’t matter where you place this file, as long as it’s on the same domain you’re calling the script from.

``` html
<script src="https://raw.github.com/por/lfm.js/master/src/lfm.js"></script>
<script>
  LFM.init({
    key: 'YOUR_API_KEY',
    secret: 'YOUR_API_SECRET',
    callback_uri: 'PATH_TO_CALLBACK_HTML'
  });
</script>
```

## Making a simple API request

``` js
// get artist info for Radiohead
LFM.get('artist.getInfo', { artist: 'Radiohead' }, function (response) {
  // handle response data
}
```

You can use ```LFM.post()``` in exactly the same way, but you’ll need to authenticate the user first.

## Authentication

LFM.js offers a simple authentication flow with a popup window. To make this method work, you will have to host the callback.html file from the same domain as you’re calling the script from, and don’t forget to add it when you call ```LFM.init()```.

Authentication requires an md5 library. LFM.js depends on the Google Crypt md5 library. Include it like this:

``` html
<script src="https://raw.github.com/por/lfm.js/master/vendor/crypto/2.3.0-crypto-md5.js"></script>
```

``` js
// first, check if the user is already logged in
var session = LFM.getSession();
if (session) {
  // user is authenticated
} else {
  // user isn’t authenticated
}

// call the login() method when the user clicks a button
// to avoid the browser blocking the popup window
$('.login-button').bind('click', function (event) {
  event.preventDefault();
  LFM.login(function (session) {
    // handle logged in user
    console.log('Hello %s!', session.user);
  }
});

// log out buttun
$('.logout-button').bind('click', function (event) {
  event.preventDefault();
  LFM.logout(function () {
    // handle logged out case
  }
});
```