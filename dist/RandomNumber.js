import inquirer from "inquirer";
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function PlayAgain() {
    const again = await inquirer.prompt([
        {
            name: "PlayAgain",
            type: "list",
            choices: ["Yes", "No"],
            message: "Do you want to try again?"
        }
    ]);
    if (again.PlayAgain === "Yes") {
        const { min, max, maxAttempts } = await chooseDifficulty();
        await Random(min, max, maxAttempts);
    }
    else if (again.PlayAgain === "No") {
        console.log("See you next time!");
    }
}
async function chooseDifficulty() {
    const difficulty = await inquirer.prompt([
        {
            name: "diffLevel",
            type: "list",
            choices: ["Easy", "Medium", "Hard"],
            message: "Select difficulty level:"
        }
    ]);
    if (difficulty.diffLevel === "Easy") {
        return { min: 1, max: 10, maxAttempts: 5 };
    }
    else if (difficulty.diffLevel === "Medium") {
        return { min: 1, max: 50, maxAttempts: 4 };
    }
    else {
        return { min: 1, max: 100, maxAttempts: 3 };
    }
}
async function Random(min, max, maxAttempts) {
    const number = RandomNumber(min, max);
    let count = 0;
    while (count < maxAttempts) {
        const newNumber = await inquirer.prompt([
            {
                name: "numberGuessing",
                type: "input",
                message: `Guess a number between ${min} and ${max}:`
            }
        ]);
        const stopOnCorrectNumber = Number(newNumber.numberGuessing);
        if (isNaN(stopOnCorrectNumber) || stopOnCorrectNumber < min || stopOnCorrectNumber > max) {
            console.log("Enter a valid number.");
            continue;
        }
        if (number === stopOnCorrectNumber) {
            console.log("You guess the correct number");
            return;
        }
        else {
            count++;
            console.log(`You have ${maxAttempts - count} attempts left.`);
            console.log("Please try again!");
        }
    }
    PlayAgain();
}
async function startGame() {
    const { min, max, maxAttempts } = await chooseDifficulty();
    await Random(min, max, maxAttempts);
}
startGame();
