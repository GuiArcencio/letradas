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
    for (let x of guess)
        countGuess[x]++;

    const colors = Array(guess.length).fill("FILLED");

    correctWord.split("").forEach((correctLetter, i) => {
        if (guess[i] === correctLetter) {
            colors[i] = "GREEN";
            countCorrect[correctLetter]--;
        }
    });

    guess.forEach((letter, i) => {
        if (countCorrect[letter] >= 1 && colors[i] === "FILLED") {
            colors[i] = "YELLOW";
            countCorrect[letter]--;
        }
    });

    return colors;
}
