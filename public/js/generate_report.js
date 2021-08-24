function generateReport(){
    console.log(data);
    document.getElementById("product").innerHTML = "Product = " + data.product;
    document.getElementById("phValue").innerHTML = "PH = " + data.ph;
    document.getElementById("organicValue").innerHTML = "Organic Material = " + data.organic_material;
    document.getElementById("currentValue").innerHTML = "Current = " + data.current;
    document.getElementById("calciumValue").innerHTML = "Calcium = " + data.calcium;
    document.getElementById("kaliumValue").innerHTML = "Kalium = " + data.kalium;
    document.getElementById("nitricValue").innerHTML = "Nitric Oxide = " + data.nitric_oxide;
    var title = data.title;
    //create chart
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PH', 'OM', 'C', 'Ca', 'K', 'N03'],
            datasets: [{
                data: [ph, organic_material, current, calcium, kalium, nitric_oxide],
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
                        stepSize: 1
                    }
                }]
            }
        }
    });

    //pdf save btn
    function saveAsPDF() {
        var doc = new jsPDF();
        var elementHTML = $('#report').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        html2canvas(document.getElementById("chart-container"), {
            onrendered: function (canvas) {
                var img = canvas.toDataURL(); //image data of canvas
                doc.addImage(img, 10, 110);
                doc.save(''+title+'.pdf');

            }
        });
    }
}