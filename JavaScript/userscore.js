var userscoreOuput = document.querySelector('.userscore-output');

function outputUserscores() {
    // Pull the array that was just saved to local storage
    var rawScores = localStorage.getItem('userScores')
    var userScores = JSON.parse(rawScores) || [];

    // Loop to create a h2 and h3 that will hold the users information within a new div.

    for (var index = 0; index < userScores.length; index ++) {
        // Create the html elements needed to store thr info
        var div = document.createElement('div');
        var h2 = document.createElement('h2');
        var h3 = document.createElement('h3');

        var scoreData = userScores[index];

        // Assign data to the correct html elements;
        h2.innerText = 'Name: ' + scoreData.names;
        h3.innerText = 'Score: ' + scoreData.score;

        // Append html elements into new div
        div.append(h2, h3);
        // Append div into ouput div
        userscoreOuput.append(div);
    }

}

// Run func created above
outputUserscores();


console.log(rawScores)
console.log(userScores)
console.log(userscoreOuput) 