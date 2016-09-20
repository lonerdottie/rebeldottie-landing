var gapiHelper = new Object();

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var reqmoreButton = document.getElementById('reqmore-button');

function initAuth() {
  gapi.client.setApiKey('AIzaSyBx81Hamn2v8ocsjQrEYJ2K6L9moGTWhyo');
  gapi.auth2.init({
    client_id: '978799287920-36s02u1u18fali3919h8ipugsb1pji6p.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email'
  }).then(function() {

    //This is where the core settings for the GoogleAuth object go
    gapiHelper.currentAuth = gapi.auth2.getAuthInstance();
    gapiHelper.currentUser = gapiHelper.currentAuth.currentUser.get();

    // Listen for sign-in state changes.
    // gapiHelper.currentAuth.isSignedIn.listen(updateSigninStatus);
    // Handle the initial sign-in state.
    updateSigninStatus(gapiHelper.currentAuth.isSignedIn.get());

    /**
      Demo Functions

    //console.log(auth2.currentUser.get().getBasicProfile().getGivenName());
    authorizeButton.addEventListener("click", handleSigninClick);
    signoutButton.addEventListener("click", handleSignoutClick);
    reqmoreButton.addEventListener("click", handleReqMoreClick);
        **/
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    //authorizeButton.style.display = 'none';
    //signoutButton.style.display = 'block';
    //makeApiCall();
    console.log(gapiHelper.currentAuth.currentUser.get().getBasicProfile().getGivenName() + ' signed in!');
  }
  else {
    //authorizeButton.style.display = 'block';
    //signoutButton.style.display = 'none';
    console.log('signed out!');
  }
}

// Get authorization from the user to access profile info
function handleSigninClick(event) {
  gapiHelper.signIn();
  //gapi.auth2.getAuthInstance().signIn()
  /* .then(function() {
    makeApiCall();
  }) */
  ;
}

gapiHelper.addScope = function(toAdd) {
  /* if (scopes.indexOf(toAdd) < 0) {
    console.log('starting with .. ' + scopes);
    scopes = scopes + " " + toAdd;
    console.log('updated scopes to add .. ' + toAdd);
    console.log('end result: ' + scopes);
  }
  else {
    //Already requested that scope
    console.log('scope already exists');
  } */
  if (!gapiHelper.currentUser.hasGrantedScopes(toAdd)) {
    gapiHelper.signIn(toAdd);
  }
  else console.log('Already has scope!');

}
gapiHelper.signIn = function(authScope) {
  console.log('signing in via gapiHelper');
  //console.log(scopes);
  gapi.auth2.getAuthInstance().signIn({
      'scope': authScope
    })
    .then(
      function(success) {
        console.log("gapiHelper: signIn success!");
        console.log(success);
        gapiHelper.currentAuth = gapi.auth2.getAuthInstance();
        gapiHelper.currentUser = gapiHelper.currentAuth.currentUser.get();
      },
      function(fail) {
        console.log("gapiHelper: signIn fail!");
        console.log(fail);
      });
}

/** 
function handleReqMoreClick(event) {
  gapiHelper.addScope('https://www.googleapis.com/auth/analytics');
}

function handleSignoutClick(event) {
  gapiHelper.currentAuth.signOut();
}
**/

gapi.load('client:auth2', initAuth);

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.load('people', 'v1', function() {
    var request = gapi.client.people.people.get({
      resourceName: 'people/me'
    });
    request.execute(function(resp) {
      console.log(resp);
      var p = document.createElement('p');
      var name = resp.names[0].givenName;
      p.appendChild(document.createTextNode('Hello, ' + name + '!'));
      document.body.appendChild(p);
    });
  });
  // Note: In this example, we use the People API to get the current
  // user's name. In a real app, you would likely get basic profile info
  // from the GoogleUser object to avoid the extra network round trip.
  console.log(gapiHelper.currentAuth.currentUser.get().getBasicProfile().getGivenName());
}