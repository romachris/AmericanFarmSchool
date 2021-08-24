


$('body').on('input_form:loaded', function () {
    $('#submitFieldForm').click(function (event) {
        event.preventDefault();
        console.log('hello');
        var data = $('#fieldForm').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        console.log(data);
        var user = firebase.auth().currentUser;
        if (user) {

            var center_Latitude = document.getElementById("center_Latitude").innerHTML;
            var center_Longtitude = document.getElementById("center_Longtitude").innerHTML;
            var Latitude1 = document.getElementById("Latitude1").innerHTML;
            var Longtitude1 = document.getElementById("Longtitude1").innerHTML;
            var Latitude2 = document.getElementById("Latitude2").innerHTML;
            var Longtitude2 = document.getElementById("Longtitude2").innerHTML;
            var Latitude3 = document.getElementById("Latitude3").innerHTML;
            var Longtitude3 = document.getElementById("Longtitude3").innerHTML;
            var Latitude4 = document.getElementById("Latitude4").innerHTML;
            var Longtitude4 = document.getElementById("Longtitude4").innerHTML;
            var uid = user.uid;


            var db = firebase.firestore();
            db.collection("Fields").doc(uid).set({
                UID: uid,
                centerCoords:{
                    center_Latitude: center_Latitude,
                    center_Longtitude: center_Longtitude
                },
                polygonCoords:{
                    Latitude1: Latitude1,
                    Longtitude1: Longtitude1,
                    Latitude2: Latitude2,
                    Longtitude2: Longtitude2,
                    Latitude3: Latitude3,
                    Longtitude3: Longtitude3,
                    Latitude4: Latitude4,
                    Longtitude4: Longtitude4
                }
                

            });
            alert("Your Field has been saved successfully");

        } else {
            alert("You need to be logged in as a user to save the report online.")
        }




    });
    console.log(data);
});

