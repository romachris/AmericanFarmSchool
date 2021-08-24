firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        var displayName = user.displayName;

        $(function () {
            $("#navigation").load("nav_loggedin.html");
            
        });
        
    } else {
        // No user is signed in.
        $(function () { $("#navigation").load("_nav.html"); });
    }
});
