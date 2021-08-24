$(function () {
    $("#job").change(function () {
        if ($(this).val() == "farmer") {
            $(function () {
                $("#farm_form").load("nav_farmer_form.html", function () {
                    $('body').trigger("input_form:loaded");
                })
            });

        } else if ($(this).val() == "agronomist") {
            $(function () {
                $("#farm_form").load("nav_agronomist_form.html", function () {
                    $('body').trigger("input_form:loaded");
                })
            });
        }
    });
});