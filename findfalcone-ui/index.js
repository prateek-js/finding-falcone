$(document).ready(function() {

    $.ajax({
        url: "http://findfalcone.herokuapp.com/planets",
        headers: {
            "Accept": "application/json"
        },
        method: 'GET',
        success: function(data) {
            $("#planets").val(JSON.stringify(data))
        }
    });

    $.ajax({
        url: "http://findfalcone.herokuapp.com/vehicles",
        headers: {
            "Accept": "application/json"
        },
        method: 'GET',
        success: function(data) {
            $("#vehicles").val(JSON.stringify(data))
        }
    });

});

function getToken() {
    $.ajax({
        url: "http://findfalcone.herokuapp.com/token",
        headers: {
            "Accept": "application/json"
        },
        method: 'POST',
        success: function(data) {
            $("#token").val(data.token)
        }
    });
}

function find() {
    $.ajax({
        // dataType: 'json',
        url: "http://findfalcone.herokuapp.com/find",
        data: $("#req").val(),
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        method: 'POST',
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });
}