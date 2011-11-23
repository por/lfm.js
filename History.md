0.0.3 / 2011-11-24
==================

  * Add basic readme documentation.
  * Rename callbackURL parameter to callback_uri
  * Add session data to login callback handler
  * Replace overall api call with get and post methods
  * Combine session data in object

0.0.2 / 2011-11-13
==================

  * Store LFM session key and user separately
  * Replace old md5 library with crypto
  * Make type and params options arguments for LFM.api() call optional
  * Move hardcoded callbackURL out
  * Remove minified lfm.js file for now
  * Add basic unit tests
  * Add jslinting

0.0.1 / 2011-10-29
==================

  * Check to see if LFM variable already exists
  * Move md5 lib out of the global scope
  * Remove jshint validation errors
  * Add build script
  * Initial commit