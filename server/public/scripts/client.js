console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addNewJoke);
    getJokes();
}

function getJokes() {
    $.ajax({
            type: 'GET',
            url: '/api/jokesArray',
        })
        .then((response) => {
            console.log(`we are getting things`);

            let incomingJokes = response.jokes;
            renderJokes(incomingJokes);
        })
        .catch((err) => {
            console.log(err);

            alert('You done messed up A-A-ron.');
        });
}

function renderJokes(joke) {
    console.log(`inside renderJokes`);
    console.log(joke);

    for (let each of joke) {
        $('#outputDiv').append(`
        <p>${each.jokeQuestion} ${each.punchline}  - ${each.whoseJoke}</p>
        `);
    }
}

function addNewJoke() {
    console.log(`something funny here`);
}