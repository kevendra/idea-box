/* jshint undef: true, unused: false */
'use strict';

/*
 * api-url.js
 * This file defines globals that are used in 
 * making request
 *
 * Example:
 * var BASE = 'http://dev.example.org/api';
 *
 */
var BASE        = 'api';

//major operations  api/...
var IDEA        = BASE + '/idea';


angular.module(_APP_)
.constant('API', {

//APP_DATA operations api/app-data/...
  IDEA_LIST:              IDEA + '/idea-list.json',
  IDEA_DELETE:            IDEA + '/delete-idea.json',
  ADD_UPDATE_IDEA:        IDEA + '/add-update-idea.json'

});