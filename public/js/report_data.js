
$('body').on('input_form:loaded', function () {
    console.log('farmer loaded evet');
    console.log($('#submitForm'));
    $('#submitForm').click(function (event) {
        event.preventDefault();
        console.log('hello');
        var data = $('#myForm').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        console.log(data);
        $('#report_or_form').load('_report.html', function () {
            $('body').trigger("report:loaded");
            console.log(data);
            document.getElementById("clay").innerHTML = data.clay;
            document.getElementById("product").innerHTML = data.product;
            document.getElementById("phosphorus").innerHTML = data.phosphorus;
            document.getElementById("saltines").innerHTML = data.saltines;
            document.getElementById("sand").innerHTML = data.sand;
            document.getElementById("sludge").innerHTML = data.sludge;
            document.getElementById("zinc").innerHTML = data.zinc;
            document.getElementById("CaCO3").innerHTML = data.CaCO3;
            document.getElementById("activeCaCO3").innerHTML = data.activeCaCO3;
            document.getElementById("alt_manganese").innerHTML =data.alt_manganese;
            document.getElementById("borium").innerHTML = data.borium;
            document.getElementById("copper").innerHTML =  data.copper;
            document.getElementById("iron").innerHTML =  data.iron;
            document.getElementById("manganese").innerHTML= data.manganese;
            document.getElementById("phValue").innerHTML =  data.ph;
            document.getElementById("organicValue").innerHTML =  data.organic_material;
            document.getElementById("calciumValue").innerHTML = data.calcium;
            document.getElementById("kaliumValue").innerHTML = data.kalium;
            document.getElementById("nitricValue").innerHTML = data.nitric_oxide;
           
            if (data.sand >= 0 && data.sand <= 30) {
                document.getElementById('sandResult').innerHTML = '-';
            } else {
                document.getElementById('sandResult').innerHTML = '-';
            }
            if (data.clay >= 0 && data.clay <= 30) {
                document.getElementById('clayResult').innerHTML = '-';
            } else {
                document.getElementById('clayResult').innerHTML = '-';
            }
            if (data.sludge >= 0 && data.sludge <= 30) {
                document.getElementById('sludgeResult').innerHTML = '-';
            } else {
                document.getElementById('sludgeResult').innerHTML = '-';
            }
            if (data.ph == 7.0 || data.ph == 7 ) {
                document.getElementById('phValueResult').innerHTML = 'Ουδέτερο';
            } else if (data.ph >= 0 && data.ph <= 5.4) {
                document.getElementById('phValueResult').innerHTML = 'Πολύ Οξύ';
                $('#advice').load('advice.html', function() {
                    $('#advice').find('#low').show();
                });
            } else if (data.ph >= 5.5 && data.ph <= 5.9) {
                document.getElementById('phValueResult').innerHTML = 'Μέτρια Οξύ';
            } else if (data.ph >= 6.0 && data.ph <= 6.9) {
                document.getElementById('phValueResult').innerHTML = 'Ελαφρώς Οξύ';
            } else if (data.ph >= 7.1 && data.ph <= 8.0) {
                document.getElementById('phValueResult').innerHTML = 'Ελαφρως Αλκαλικο';
            } else if (data.ph >= 8.1 && data.ph <= 9.0) {
                document.getElementById('phValueResult').innerHTML = ' Μετρια Αλκαλικο';
            } else {
                document.getElementById('phValueResult').innerHTML = 'Πολυ Αλκαλικο';
                $('#advice').load('advice.html', function() {
                    $('#advice').find('#high').show();
                });
            }
            if (data.saltines < 2) {
                document.getElementById('saltinesResult').innerHTML = 'Κανονική';
            } else {
                document.getElementById('saltinesResult').innerHTML = 'Υψηλή';
            }
            if (data.organic_material >= 1 && data.organic_material <= 2) {
                document.getElementById('organicValueResult').innerHTML = 'Κανονική';
            } else if (data.organic_material < 1) {
                document.getElementById('organicValueResult').innerHTML = 'Χαμηλή';
            } else {
                document.getElementById('organicValueResult').innerHTML = 'Υψηλή';

            }
            if (data.CaCO3 <= 10) {
                document.getElementById('CaCO3Result').innerHTML = 'Κανονική';
            } else {
                document.getElementById('CaCO3Result').innerHTML = 'Υψηλή';
            }
            if (data.activeCaCO3 <= 5) {
                document.getElementById('activeCaCO3Result').innerHTML = 'Κανονική';
            } else {
                document.getElementById('activeCaCO3Result').innerHTML = 'Υψηλή';
            }


            if (data.nitric_oxide <= 10) {
                document.getElementById('nitricValueResult').innerHTML = 'Ανεπάρκεια';
            }else if (data.nitric_oxide >= 11 && data.nitric_oxide < 20) {
                document.getElementById('nitricValueResult').innerHTML = 'Μερική Ανεπάρκεια';
            }else if (data.nitric_oxide >= 20 && data.nitric_oxide <= 30) {
                document.getElementById('nitricValueResult').innerHTML = 'Μερική Επάρκεια';
            }else if (data.nitric_oxide >= 31 && data.nitric_oxide <= 40) {
                document.getElementById('nitricValueResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('nitricValueResult').innerHTML = 'Υπερεπάρκεια';

            }

            if (data.phosphorus >= 0 && data.phosphorus <= 5) {
                document.getElementById('phosphorusResult').innerHTML = 'Ανεπάρκεια';
            } else if (data.phosphorus >= 6 && data.phosphorus <= 12) {
                document.getElementById('phosphorusResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (data.phosphorus >= 13 && data.phosphorus <= 17) {
                document.getElementById('phosphorusResult').innerHTML = 'Μερική Επάρκεια';
            } else if (data.phosphorus >= 18 && data.phosphorus <= 25) {
                document.getElementById('phosphorusResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('phosphorusResult').innerHTML = 'Υπερεπάρκεια';
            }
            
            if (data.kalium >= 0 && data.kalium <= 40) {
                document.getElementById('kaliumValueResult').innerHTML = 'Ανεπάρκεια';
            } else if (data.kalium >= 41 && data.kalium <= 94) {
                document.getElementById('kaliumValueResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (data.kalium >= 95 && data.kalium <= 180) {
                document.getElementById('kaliumValueResult').innerHTML = 'Μερική Επάρκεια';
            } else if (data.kalium >= 181 && data.kalium <= 255) {
                document.getElementById('kaliumValueResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('kaliumValueResult').innerHTML = 'Υπερεπάρκεια';

            }
            if (data.alt_manganese >= 0 && data.alt_manganese <= 30) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Ανεπάρκεια';
            } else if (data.alt_manganese >= 30 && data.alt_manganese <= 63) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (data.alt_manganese >= 64 && data.alt_manganese <= 94) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Μερική Επάρκεια';
            } else if (data.alt_manganese >= 95 && data.alt_manganese <= 115) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('alt_manganeseResult').innerHTML = 'Υπερεπάρκεια';

            }
            if (data.calcium >= 0 && data.calcium <= 149) {
                document.getElementById('calciumValueResult').innerHTML = 'Ανεπάρκεια';
            } else if (data.calcium >= 150 && data.calcium <= 299) {
                document.getElementById('calciumValueResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (data.calcium >= 300 && data.calcium <= 500) {
                document.getElementById('calciumValueResult').innerHTML = 'Μερική Επάρκεια';
            } else if (data.calcium >= 501 && data.calcium <= 750) {
                document.getElementById('calciumValueResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('calciumValueResult').innerHTML = 'Υπερεπάρκεια';

            }


            if (data.iron >= 0 && data.iron <= 3) {
                document.getElementById('ironResult').innerHTML = 'Ανεπάρκεια';
            }  else if (data.iron >= 4 && data.iron <= 7) {
                document.getElementById('ironResult').innerHTML = 'Μερική Ανεπάρκεια';
            }  else if (data.iron >= 8 && data.iron <= 16) {
                document.getElementById('ironResult').innerHTML = 'Μερική Επάρκεια';
            } else if (data.iron >= 17 && data.iron <= 25) {
                document.getElementById('ironResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('ironResult').innerHTML = 'Υπερεπάρκεια';
            }

            if (data.zinc >= 1 && data.zinc <= 2.5) {
                document.getElementById('zincResult').innerHTML = 'Επάρκεια';
            } else if (data.zinc < 1) {
                document.getElementById('zincResult').innerHTML = 'Ανεπάρκεια';
            } else {
                document.getElementById('zincResult').innerHTML = 'Υπερεπάρκεια';
            }

            if (data.manganese >= 0 && data.manganese <= 6) {
                document.getElementById('manganeseResult').innerHTML = 'Ανεπάρκεια';
            } else if (data.manganese >= 7 && data.manganese <= 15) {
                document.getElementById('manganeseResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (data.manganese >= 16 && data.manganese <= 20) {
                document.getElementById('manganeseResult').innerHTML = 'Μερική Επάρκεια';
            } else if (data.manganese >= 21 && data.manganese <= 25) {
                document.getElementById('manganeseResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('manganeseResult').innerHTML = 'Υπερεπάρκεια';
            }

            if (data.copper >= 0.8 && data.copper <= 1.5) {
                document.getElementById('copperResult').innerHTML = 'Επάρκεια';
            } else if (data.copper < 0.8) {
                document.getElementById('copperResult').innerHTML = 'Ανεπάρκεια';
            } else {
                document.getElementById('copperResult').innerHTML = 'Υπερεπάρκεια';

            }
            if (data.borium >= 0.5 && data.borium <= 1) {
                document.getElementById('boriumResult').innerHTML = 'Επάρκεια';
            } else if (data.borium < 0.5) {
                document.getElementById('boriumResult').innerHTML = 'Ανεπάρκεια';
            } else {
                document.getElementById('boriumResult').innerHTML = 'Υπερεπάρκεια';

            }

            //create chart
            var chartChem = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['Νo3-N', 'P', 'K', 'Mg', 'Ca', 'Fe', 'Zn','Mn', 'Cu','B'],
                    datasets: [{
                        label: '',
                        data: [data.nitric_oxide, data.phosphorus, data.kalium, data.alt_manganese, data.calcium, data.iron, data.zinc, data.manganese, data.copper, data.borium],
                        backgroundColor: 'rgba(0, 119, 290, 0.2)',
                        borderColor: 'rgba(0, 119, 290, 0.6)',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 100
                            }
                        }]
                    }
                }
            });
            var chartChem = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Sa', 'Cl', 'Sl', 'Ph', 'Saltines', 'OrgM', 'CaCO3','ActCaCO3'],
                    datasets: [{
                        label: '',
                        data: [data.sand, data.clay, data.sludge, data.ph, data.saltines,data.organic_material,data.CaCO3,data.activeCaCO3],
                        backgroundColor: 'rgba(0, 119, 290, 0.2)',
                        borderColor: 'rgba(0, 119, 290, 0.6)',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                stepSize: 20
                            }
                        }]
                    }
                }
            });

        });
        console.log(data);

    });
});


$('body').on('report:loaded', function () {
    $('#save_Report').click(function saveData() {
        var user = firebase.auth().currentUser;
        if (user) {
            var reportName = document.getElementById("reportName").value;

            if(reportName!= "")
            {
            var product = document.getElementById("product").innerHTML;
            var phosphorus = document.getElementById("phosphorus").innerHTML;
            var CaCO3 = document.getElementById("CaCO3").innerHTML;
            var activeCaCO3 = document.getElementById("activeCaCO3").innerHTML;
            var alt_manganese = document.getElementById("alt_manganese").innerHTML;
            var manganese = document.getElementById("manganese").innerHTML;
            var borium = document.getElementById("borium").innerHTML;
            var clay = document.getElementById("clay").innerHTML;
            var copper = document.getElementById("copper").innerHTML;
            var iron = document.getElementById("iron").innerHTML;
            var saltines = document.getElementById("saltines").innerHTML;
            var ph = document.getElementById("phValue").innerHTML;
            var organic_material = document.getElementById("organicValue").innerHTML;
            var sand = document.getElementById("sand").innerHTML;
            var sludge = document.getElementById("sludge").innerHTML;
            var zinc = document.getElementById("zinc").innerHTML;
            var calcium = document.getElementById("calciumValue").innerHTML;
            var kalium = document.getElementById("kaliumValue").innerHTML;
            var nitric_oxide = document.getElementById("nitricValue").innerHTML;
            var uid = user.uid;

            var db = firebase.firestore();
            db.collection("Reports").add({
                UID: uid,
                CaCO3: CaCO3,
                activeCaCO3: activeCaCO3,
                alt_manganese: alt_manganese,
                borium: borium,
                calcium: calcium,
                clay: clay,
                copper: copper,
                iron: iron,
                kalium: kalium,
                manganese: manganese,
                nitric_oxide: nitric_oxide,
                organic_material: organic_material,
                ph: ph,
                phosphorus: phosphorus,
                product: product,
                saltines: saltines,
                sand: sand,
                sludge: sludge,
                zinc: zinc,
                title: reportName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert("Your report has been saved successfully");
        }
        else{
            alert("Please type a name");
        }

        } else {
            alert("You need to be logged in as a user to save the report online.")
        }


    });
});

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}