
$(function () {
    $("#fieldFormDiv").load("_addFieldForm.html", function () {
        $('body').trigger("input_form:loaded");
    })
});

