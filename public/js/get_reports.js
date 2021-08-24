firebase.auth().onAuthStateChanged(function (user) {
    var uidArray;
    var productArray;
    var phArray;
    var calciumArray;
    var kaliumArray;
    var no3Array;
    var organic_materialArray;
    var timeArray;
    var phosphorusArray;
    var saltinesArray;
    var zincArray;
    var CaCO3Array;
    var activeCaCO3Array;
    var alt_manganeseArray;
    var boriumArray;
    var copperArray;
    var ironArray;
    var manganeseArray;
    var clayArray;
    var nitric_oxideArray;
    

    if (user) {
        var db = firebase.firestore();
        db.collection("Reports").where("UID", "==", user.uid) 
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    uidArray = Array.from(querySnapshot.docs, x => x.data().UID);
                    titleArray= Array.from(querySnapshot.docs, x => x.data().title);
                    productArray = Array.from(querySnapshot.docs, x => x.data().product);
                    phArray = Array.from(querySnapshot.docs, x => x.data().ph);
                    calciumArray = Array.from(querySnapshot.docs, x => x.data().calcium);
                    kaliumArray = Array.from(querySnapshot.docs, x => x.data().kalium);
                    organic_materialArray = Array.from(querySnapshot.docs, x => x.data().organic_material);
                    phosphorusArray = Array.from(querySnapshot.docs, x => x.data().phosphorus);
                    saltinesArray = Array.from(querySnapshot.docs, x => x.data().saltines);
                    sandArray = Array.from(querySnapshot.docs, x => x.data().sand);
                    sludgeArray = Array.from(querySnapshot.docs, x => x.data().sludge);
                    zincArray = Array.from(querySnapshot.docs, x => x.data().zinc);
                    CaCO3Array = Array.from(querySnapshot.docs, x => x.data().CaCO3);
                    activeCaCO3Array = Array.from(querySnapshot.docs, x => x.data().activeCaCO3);
                    alt_manganeseArray = Array.from(querySnapshot.docs, x => x.data().alt_manganese);
                    boriumArray = Array.from(querySnapshot.docs, x => x.data().borium);
                    copperArray = Array.from(querySnapshot.docs, x => x.data().copper);
                    ironArray = Array.from(querySnapshot.docs, x => x.data().iron);
                    manganeseArray = Array.from(querySnapshot.docs, x => x.data().manganese);
                    clayArray = Array.from(querySnapshot.docs, x => x.data().clay);
                    nitric_oxideArray = Array.from(querySnapshot.docs, x => x.data().nitric_oxide);
                    timeArray = Array.from(querySnapshot.docs, x => x.data().timestamp);
                    
                });
                var content;
                var date = new Date();
                for (var i = 0; i < productArray.length; i++) {
                    date = timeArray[i].toDate();
                    var day = date.getDay()+1;
                    var month = date.getMonth()+1;
                    var year = date.getFullYear();
                    console.log(date);

                    content += '<tr id="'+i+'">';
                    content += '<td>' + titleArray[i] + '</td>'; //column1                    
                    content += '<td>' + productArray[i] + '</td>';//column2
                    content += '<td>' +day+'/'+month+'/'+year+ '</td>';//column3

                    content += '<td><input class="form-control" type="button" value="View" id="' + i + '"></td>';
                    content += '<td><input class="form-control" type="button" value="Delete" id="' + i + '"></td>';
                    content += '</tr>';
                }
                $('#ex-table').append(content);
                $('#ex-table').ready(function () {
                    $('#myTable').DataTable();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
            

    } else {
        console.log("Wrong!");
    }
    $('table').on('click', 'input[value="Delete"]', function (e) {
        var i = this.id;
        $(this).closest('tr').remove();
        var jobskill_query = db.collection('Reports').where('title', '==', titleArray[i]);
        jobskill_query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
                titleArray.splice(i, 1);
                uidArray.splice(i, 1);
                productArray.splice(i, 1);
                phArray.splice(i, 1);
                calciumArray.splice(i, 1);
                kaliumArray.splice(i, 1);
                no3Array.splice(i, 1);
                organic_materialArray.splice(i, 1);
                console.log("Document successfully deleted!");
            });
        });


    })
    $('table').on('click', 'input[value="View"]', function (e) {
        var i = this.id;
        $('#reportView').load('view_report.html', function () {
            $('body').trigger("report:loaded");
            document.getElementById("title").innerHTML = titleArray[i];
            document.getElementById("product").innerHTML = productArray[i];
            document.getElementById("clay").innerHTML = clayArray[i];
            document.getElementById("phosphorus").innerHTML = phosphorusArray[i];
            document.getElementById("saltines").innerHTML = saltinesArray[i];
            document.getElementById("sand").innerHTML = sandArray[i];
            document.getElementById("sludge").innerHTML = sludgeArray[i];
            document.getElementById("zinc").innerHTML = zincArray[i];
            document.getElementById("CaCO3").innerHTML = CaCO3Array[i];
            document.getElementById("activeCaCO3").innerHTML = activeCaCO3Array[i];
            document.getElementById("alt_manganese").innerHTML = alt_manganeseArray[i];
            document.getElementById("borium").innerHTML = boriumArray[i];
            document.getElementById("copper").innerHTML = copperArray[i];
            document.getElementById("iron").innerHTML = ironArray[i];
            document.getElementById("manganese").innerHTML = manganeseArray[i];
            document.getElementById("product").innerHTML = productArray[i];
            document.getElementById("phValue").innerHTML = phArray[i];
            document.getElementById("organicValue").innerHTML = organic_materialArray[i];
            document.getElementById("calciumValue").innerHTML = calciumArray[i];
            document.getElementById("kaliumValue").innerHTML = kaliumArray[i];
            document.getElementById("nitricValue").innerHTML = nitric_oxideArray[i];
            
            if (sandArray[i] >= 0 && sandArray[i] <= 30) {
                document.getElementById('sandResult').innerHTML = '-';
            } else {
                document.getElementById('sandResult').innerHTML = '-';
            }
            if (clayArray[i] >= 0 && clayArray[i] <= 30) {
                document.getElementById('clayResult').innerHTML = '-';
            } else {
                document.getElementById('clayResult').innerHTML = '-';
            }
            if (sludgeArray[i] >= 0 && sludgeArray[i] <= 30) {
                document.getElementById('sludgeResult').innerHTML = '-';
            } else {
                document.getElementById('sludgeResult').innerHTML = '-';
            }
            if (phArray[i] == 7.0 || phArray[i] == 7) {
                document.getElementById('phValueResult').innerHTML = 'Ουδέτερο';
            } else if (phArray[i] >= 0 && phArray[i] <= 5.4) {
                document.getElementById('phValueResult').innerHTML = 'Πολύ Οξύ';
                $('#advice').load('advice.html', function() {
                    $('#advice').find('#low').show();
                });
            } else if (phArray[i] >= 5.5 && phArray[i] <= 5.9) {
                document.getElementById('phValueResult').innerHTML = 'Μέτρια Οξύ';
            } else if (phArray[i] >= 6.0 && phArray[i] <= 6.9) {
                document.getElementById('phValueResult').innerHTML = 'Ελαφρώς Οξύ';
            } else if (phArray[i] >= 7.1 && phArray[i] <= 8.0) {
                document.getElementById('phValueResult').innerHTML = 'Ελαφρως Αλκαλικο';
            } else if (phArray[i] >= 8.1 && phArray[i] <= 9.0) {
                document.getElementById('phValueResult').innerHTML = ' Μετρια Αλκαλικο';
            } else {
                document.getElementById('phValueResult').innerHTML = 'Πολυ Αλκαλικο';
                $('#advice').load('advice.html', function() {
                    $('#advice').find('#high').show();
                });
            }
            if (saltinesArray[i] < 2) {
                document.getElementById('saltinesResult').innerHTML = 'Κανονική';
            } else {
                document.getElementById('saltinesResult').innerHTML = 'Υψηλή';
            }
            if (organic_materialArray[i] >= 1 && organic_materialArray[i] <= 2) {
                document.getElementById('organicValueResult').innerHTML = 'Κανονική';
            } else if(organic_materialArray[i]< 1){
                document.getElementById('organicValueResult').innerHTML = 'Χαμηλή';
            }else{
                document.getElementById('organicValueResult').innerHTML = 'Υψηλή';

            }
            if (CaCO3Array[i] <= 10) {
                document.getElementById('CaCO3Result').innerHTML = 'Κανονική';
            } else {
                document.getElementById('CaCO3Result').innerHTML = 'Υψηλή';
            }
            if (activeCaCO3Array[i] <= 5) {
                document.getElementById('activeCaCO3Result').innerHTML = 'Κανονική';
            } else {
                document.getElementById('activeCaCO3Result').innerHTML = 'Υψηλή';
            }

            if (nitric_oxideArray[i] <= 10) {
                document.getElementById('nitricValueResult').innerHTML = 'Ανεπάρκεια';
            }else if (nitric_oxideArray[i] >= 11 && nitric_oxideArray[i] < 20) {
                document.getElementById('nitricValueResult').innerHTML = 'Μερική Ανεπάρκεια';
            }else if (nitric_oxideArray[i] >= 20 && nitric_oxideArray[i] <= 30) {
                document.getElementById('nitricValueResult').innerHTML = 'Μερική Επάρκεια';
            }else if (nitric_oxideArray[i] >= 31 && nitric_oxideArray[i] <= 40) {
                document.getElementById('nitricValueResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('nitricValueResult').innerHTML = 'Υπερεπάρκεια';
            }

            
            if (phosphorusArray[i] >= 0 && phosphorusArray[i] <= 5) {
                document.getElementById('phosphorusResult').innerHTML = 'Ανεπάρκεια';
            } else if (phosphorusArray[i] >= 6 && phosphorusArray[i] <= 12) {
                document.getElementById('phosphorusResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (phosphorusArray[i] >= 13 && phosphorusArray[i] <= 17) {
                document.getElementById('phosphorusResult').innerHTML = 'Μερική Επάρκεια';
            } else if (phosphorusArray[i] >= 18 && phosphorusArray[i] <= 25) {
                document.getElementById('phosphorusResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('phosphorusResult').innerHTML = 'Υπερεπάρκεια';
            }
            
            if (kaliumArray[i] >= 0 && kaliumArray[i] <= 40) {
                document.getElementById('kaliumValueResult').innerHTML = 'Ανεπάρκεια';
            } else if (kaliumArray[i] >= 41 && kaliumArray[i] <= 94) {
                document.getElementById('kaliumValueResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (kaliumArray[i] >= 95 && kaliumArray[i] <= 180) {
                document.getElementById('kaliumValueResult').innerHTML = 'Μερική Επάρκεια';
            } else if (kaliumArray[i] >= 181 && kaliumArray[i] <= 255) {
                document.getElementById('kaliumValueResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('kaliumValueResult').innerHTML = 'Υπερεπάρκεια';

            }
            
            if (alt_manganeseArray[i] >= 0 && alt_manganeseArray[i] <= 30) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Ανεπάρκεια';
            } else if (alt_manganeseArray[i] >= 30 && alt_manganeseArray[i] <= 63) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (alt_manganeseArray[i] >= 64 && alt_manganeseArray[i] <= 94) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Μερική Επάρκεια';
            } else if (alt_manganeseArray[i] >= 95 && alt_manganeseArray[i] <= 115) {
                document.getElementById('alt_manganeseResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('alt_manganeseResult').innerHTML = 'Υπερεπάρκεια';
            }
            
            if (calciumArray[i] >= 0 && calciumArray[i] <= 149) {
                document.getElementById('calciumValueResult').innerHTML = 'Ανεπάρκεια';
            } else if (calciumArray[i] >= 150 && calciumArray[i] <= 299) {
                document.getElementById('calciumValueResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (calciumArray[i] >= 300 && calciumArray[i] <= 500) {
                document.getElementById('calciumValueResult').innerHTML = 'Μερική Επάρκεια';
            } else if (calciumArray[i] >= 501 && calciumArray[i] <= 750) {
                document.getElementById('calciumValueResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('calciumValueResult').innerHTML = 'Υπερεπάρκεια';

            }

            
            if (ironArray[i] >= 0 && ironArray[i] <= 3) {
                document.getElementById('ironResult').innerHTML = 'Ανεπάρκεια';
            }  else if (ironArray[i] >= 4 && ironArray[i] <= 7) {
                document.getElementById('ironResult').innerHTML = 'Μερική Ανεπάρκεια';
            }  else if (ironArray[i] >= 8 && ironArray[i] <= 16) {
                document.getElementById('ironResult').innerHTML = 'Μερική Επάρκεια';
            } else if (ironArray[i] >= 17 && ironArray[i] <= 25) {
                document.getElementById('ironResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('ironResult').innerHTML = 'Υπερεπάρκεια';
            }

            if (zincArray[i] >= 1 && zincArray[i] <= 2.5) {
                document.getElementById('zincResult').innerHTML = 'Επάρκεια';
            } else if (zincArray[i] < 1) {
                document.getElementById('zincResult').innerHTML = 'Ανεπάρκεια';
            } else {
                document.getElementById('zincResult').innerHTML = 'Υπερεπάρκεια';

            }
            
            if (manganeseArray[i] >= 0 && manganeseArray[i]<= 6) {
                document.getElementById('manganeseResult').innerHTML = 'Ανεπάρκεια';
            } else if (manganeseArray[i]  >= 7 && manganeseArray[i]  <= 15) {
                document.getElementById('manganeseResult').innerHTML = 'Μερική Ανεπάρκεια';
            } else if (manganeseArray[i]  >= 16 && manganeseArray[i]  <= 20) {
                document.getElementById('manganeseResult').innerHTML = 'Μερική Επάρκεια';
            } else if (manganeseArray[i]  >= 21 && manganeseArray[i]  <= 25) {
                document.getElementById('manganeseResult').innerHTML = 'Επάρκεια';
            } else {
                document.getElementById('manganeseResult').innerHTML = 'Υπερεπάρκεια';
            }

            if (copperArray[i] >= 0.8 && copperArray[i] <= 1.5) {
                document.getElementById('copperResult').innerHTML = 'Επάρκεια';
            } else if (copperArray[i] < 0.8) {
                document.getElementById('copperResult').innerHTML = 'Ανεπάρκεια';
            } else {
                document.getElementById('copperResult').innerHTML = 'Υπερεπάρκεια';

            }
            if (boriumArray[i] >= 0.5 && boriumArray[i] <= 1) {
                document.getElementById('boriumResult').innerHTML = 'Επάρκεια';
            } else if (boriumArray  [i] < 0.5) {
                document.getElementById('boriumResult').innerHTML = 'Ανεπάρκεια';
            } else {
                document.getElementById('boriumResult').innerHTML = 'Υπερεπάρκεια';

            }


            //create chart
            var chartChem = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Sa', 'Cl', 'Sl', 'Ph', 'Saltines', 'OrgM', 'CaCO3','ActCaCO3'],
                    datasets: [{
                        label: '',
                        data: [sandArray[i], clayArray[i], sludgeArray[i], phArray[i], saltinesArray[i], organic_materialArray[i], CaCO3Array[i], activeCaCO3Array[i]], 
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
            var chartChem = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['Νo3-N', 'P', 'K', 'Mg', 'Ca', 'Fe', 'Zn','Mn', 'Cu','B'],
                    datasets: [{
                        label: '',
                        data: [nitric_oxideArray[i], phosphorusArray[i], kaliumArray[i], alt_manganeseArray[i], calciumArray[i], ironArray[i], zincArray[i], manganeseArray[i], copperArray[i], boriumArray[i]],
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

        });
    
    })
})

