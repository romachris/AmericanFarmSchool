firebase.auth().onAuthStateChanged(function (user) {

    // console.log("Wrong!");
    var uidArray;
    var center_LatitudeArray;
    var center_LongtitudeArray;
    var Latitude1Array;
    var Longtitude1Array;
    var Latitude2Array;
    var Longtitude2Array;
    var Latitude3Array;
    var Longtitude3Array;
    var Latitude4Array;
    var Longtitude4Array;

    if (user) {
        var user = firebase.auth().currentUser;
        var db = firebase.firestore();
        db.collection("Fields").where("UID", "==", user.uid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // uidArray = Array.from(querySnapshot.docs, x => x.data().user.UID);
                    center_LatitudeArray = Array.from(querySnapshot.docs, x => x.data().centerCoords.center_Latitude);
                    center_LongtitudeArray = Array.from(querySnapshot.docs, x => x.data().centerCoords.center_Longtitude);
                    Latitude1Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Latitude1);
                    Longtitude1Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Longtitude1);
                    Latitude2Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Latitude2);
                    Longtitude2Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Longtitude2);
                    Latitude3Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Latitude3);
                    Longtitude3Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Longtitude3);
                    Latitude4Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Latitude4);
                    Longtitude4Array = Array.from(querySnapshot.docs, x => x.data().polygonCoords.Longtitude4);

                });
                var content;
                var date = new Date();
                for (var i = 0; i < center_LatitudeArray.length; i++) {


                    content += '<tr id="' + i + '">';
                    content += '<td>' + user.uid + '</td>'; //column1  
                    content += '<td><input class="form-control" type="button" value="View" id="' + i + '"></td>';
                    content += '</tr>';
                }
                $('#fieldTable').append(content);

            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        $('table').on('click', 'input[value="View"]', function (e) {
            var i = this.id;
            $(document).ready(function () {
                function initMap() {
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 17,
                        center: { lat: center_LatitudeArray[i], lng: center_LongtitudeArray[i] },
                        mapTypeId: 'satellite'
                    });

                    // Define the LatLng coordinates for the polygon's  outer path.
                    var triangleCoords = [
                        { lat: Latitude1Array[i], lng: Longtitude1Array[i] },
                        { lat: Latitude2Array[i], lng: Longtitude2Array[i] },
                        { lat: Latitude3Array[i], lng: Longtitude3Array[i] },
                        { lat: Latitude4Array[i], lng: Longtitude4Array[i] }
                    ];

                    // Construct the polygon, including both paths.
                    var bermudaTriangle = new google.maps.Polygon({
                        paths: triangleCoords,
                        strokeColor: '#FFC107',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillOpacity: 0.35
                    });
                    bermudaTriangle.setMap(map);
                }
            });
        });
    } else {
        console.log("Wrong!");
    }
})