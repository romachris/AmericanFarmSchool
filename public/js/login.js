firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();
        // User is signed in.

        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        

        var useruid = user.uid;
        var farmer = false;
        var agronomist = false;
        console.log(user.uid);

        db.collection("Users").where("UID", "==", useruid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.data());
                    farmer = doc.data().isFarmer;
                    agronomist = doc.data().isAgronomist;
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        console.log(farmer);
        console.log(agronomist);
        


        if (user != null) {
            var agrnomistUIDS;

            var email_id = user.email;
            var email_verified = user.emailVerified;
            var name = user.displayName;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + "<br>Verified : " + email_verified + "<br>Name : <span class=\"user_name\">" + name + "</span>";

            if (email_verified) {
                document.getElementById("verify_btn").style.display = "none";
            } else {
                document.getElementById("verify_btn").style.display = "block";
            }



            if (user.isAgronomist){
                
                db.collection("Users").where("isAgronomist","==", true)
                .get()
                .then(function (querySnapshot){
                    querySnapshot.forEach(function(doc){
                        agrnomistUIDS = Array.from(querySnapshot.docs, x => x.data().UID);
                    });
                })
            }

        }


    } else {
        // No user is signed in.

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        //        document.getElementById("login_message").style.display = "block";
        //        document.getElementById("user_message").style.display = "none";

    }
});

$("choose_agronomit").on("click", function(){
    
})
function chooseAgronomist(){
   
}


function login(e) {
    e.preventDefault();
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + error.message);

        // ...
    });

}

function logout() {
    firebase.auth().signOut();
}

function signup(e) {
    e.preventDefault();

    var userEmail = document.getElementById("sign_up_email_field").value;
    var userPass = document.getElementById("sign_up_password_field").value;
    var yourName = document.getElementById("yourName").value;
    var role = document.getElementById("yourJob").value;

   
    // yourJob === 'Farmer' ? isFarmer = true : isAgronomist = true;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
        .then(function (user) {
            user.updateProfile({
                displayName: yourName
            }).then(function () {
                document.getElementsByClassName("user_name")[0].innerHTML = yourName;
            })
            var db = firebase.firestore();
            var batch = db.batch();
            batch.set(db.collection("Users").doc(user.uid), {
                UID: user.uid,
                name: yourName,
                email: userEmail,  
                role: role
            });
            batch.set(db.collection("Clients").doc(user.uid), {
                UID: user.uid,
                clients: {}
            });

            
            batch.commit()
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                })

        })

        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            window.alert("Error : " + error.message)
        });






}

function send_verification() {

    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        window.alert("Verification Sent")
    }).catch(function (error) {
        // An error happened.
        window.alert("Error : " + error.message)
    });


}

function set_password() {
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function () {
        // Update successful.
    }).catch(function (error) {
        // An error happened.
        window.alert("Error : " + error.message)
    });

}

