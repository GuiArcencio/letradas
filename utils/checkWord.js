const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function checkWord(guess, correctWord) {
    const countCorrect = {};
    const countGuess = {};
    for (let x of LETTERS) {
        countCorrect[x] = 0;
        countGuess[x] = 0;
    }

    for (let x of correctWord)
        countCorrect[x]++;

    console.log(countCorrect);

    const colors = [];
    guess.forEach((letter, i) => {
        countGuess[letter]++;
        if (countGuess[letter] > countCorrect[letter])
            colors.push("FILLED");
        else if (letter === correctWord[i])
            colors.push("GREEN");
        else
            colors.push("YELLOW");
    });

    return colors;
}
