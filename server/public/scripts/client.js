console.log('client.js sourced');

$(document).ready(onReady);

let newUserJoke = {};

function onReady() {
    console.log('DOM ready');
    //$('#addJokeButton').on('click', addNewJoke);
    $('#addJokeForm').on('submit', addNewJoke);
    getJokes();
}

function getJokes() {
    // GETs jokes from server.js
    $.ajax({
            type: 'GET',
            url: '/api/jokesArray',
        })
        .then((response) => {
            let incomingJokes = response.jokes;
            renderJokes(incomingJokes);
        })
        .catch((err) => {
            console.log(err);
            alert('You done messed up A-A-ron.');
        });
}

function renderJokes(joke) {
    // takes data from server.js and renders it on DOM.
    $('#outputDiv').empty();

    for (let each of joke) {
        $('#outputDiv').append(`
        <p>${each.jokeQuestion} <br> <em >${each.punchLine}</em>   <span class="form-text text-muted"> - ${each.whoseJoke}</span> </p>
        `);
    }
}

function addNewJoke(event) {
    event.preventDefault();
    console.log(`something funny here`);
    let userJoke = createNewJoke();
    $.ajax({
            type: 'POST',
            url: '/api/userJokes',
            data: userJoke,
        })
        .then((response) => {
            console.log(response);
            getJokes();
        })
        .catch((err) => {
            console.log(err);
            alert('You done messed up A-A-ron.');
        });
}

function createNewJoke() {
    newUserJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val(),
    };
    clearInputs();
    return newUserJoke;
}

function clearInputs() {
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}