//js no quiere funcionar, no coge llamadas ni elementos de documento, ya paso. Sé la lógica que hay que hacer pero esta mierda no funciona



function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
/* Función implementada con AJAX (se llama al recargar la página y al darle a: Volver a jugar!) */
var correctAnswers

function openTrivia() {
    numQuestion = 0;
    correctAnswers = 0;
    results = {}; // Parte del JSON devuelto que contiene las preguntas...

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=11", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            results = respuesta.results;
            console.log(results);
            correctAnswers = results[0].correct_answer
            question(results);
        }
    }
    ajax.send();
}


function question(results) {
    document.querySelector("#pregunta").innerHTML = results[0].question


    //respuestas
    var respuestas = [results[0].correct_answer]
    results[0].incorrect_answers.forEach(function(valor, indice, array) {
        respuestas.push(valor);
    });




    //desordenar respuestas
    let currentIndex = respuestas.length,
        randomIndex;


    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [respuestas[currentIndex], respuestas[randomIndex]] = [
            respuestas[randomIndex], respuestas[currentIndex]
        ];
    }






    respuestas.forEach(function(valor, indice, array) {
        document.getElementById("respuestas").innerHTML += "<button class='btn btn-primary btn-lg btn-block mt-4 answer'>" + valor + "</button>"
    });


}








window.onload = function() {
    openTrivia()
}