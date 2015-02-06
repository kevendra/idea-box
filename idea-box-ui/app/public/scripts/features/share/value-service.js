'use strict';


angular.module(_APP_).value('VAL', {
	user: {},
  profile: {},
  navigation: {},
  authData: {authenticated: false, notAuthorized: false, showSignOutMessage: false, showSignInFailureMessage: false},
  selected: {uiState:undefined, portfolioBy:undefined},
  

  last: undefined
});