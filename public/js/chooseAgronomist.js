
firebase.auth().onAuthStateChanged(function (user) {


    var user = firebase.auth().currentUser;
    if (user) {

        populateAgronomistList();
    } else {
        alert('you are not authorised to be Headers. LEAVE!');
    }
})


function populateAgronomistList() {
    var db = firebase.firestore();
    var clientNames;
    db.collection("Users").where("role", "==", "agronomist")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                clientNames = Array.from(querySnapshot.docs, x => x.data().name);
            });
            var content = '';
            for (var i = 0; i < clientNames.length; i++) {
                content += '<input class="form-check-input" type="checkbox" value="' + clientNames[i] + '" id="defaultCheck1">' + clientNames[i] + '<br>';
            }
            content += '<button type="submit" value="Submit">Submit</button>'
            $('#agronomistList').append(content);

        })
}
