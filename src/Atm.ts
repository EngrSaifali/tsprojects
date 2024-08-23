import inquirer from "inquirer";

type userDatabase = {

    id: string,
    pin: number,
    balance: number

}

const userData: userDatabase[] = [
    {
        id: "P26246378",
        pin: 2004,
        balance: 50000
    },
    {
        id: "k69327363",
        pin: 1971,
        balance: 100000
    },
    {
        id: "L52995925",
        pin: 2002,
        balance: 300000
    },
    {
        id: "S79939357",
        pin: 2008,
        balance: 500000
    },
    {
        id: "H23298257",
        pin: 1975,
        balance: 900000
    }
]

async function ATM() {

    const machine = await inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter your ID number:"
        },
        {
            name: "pin",
            type: "number",
            message: "Enter your PIN:"
        }
    ])

    const user = userData.find(userID => userID.id === machine.id);

    if(user && user.pin === machine.pin) {
        console.log(`Login Successfully. Your ID number is [${user.id}].`);
        await ATMOptions(user);
    } else {
        console.error("Invalid User ID or PIN. Please try again.");
    }

}

async function ATMOptions(user: userDatabase) {

    while(true) {    
        const atmMenu = await inquirer.prompt([
            {
                name: "menu",
                type: "list",
                choices: ["Check Balance", "Withdraw Money", "Deposit Money", "Exit"],
                message: "Please select your desired transaction"
            }
        ])

        if(atmMenu.menu === "Check Balance") {
            console.log(`Your current balance is: ${user.balance}`);
        }

        if(atmMenu.menu === "Withdraw Money") {
            console.log(`Your current balance is: ${user.balance}`);

            const withdrawAmount = await inquirer.prompt({
                name: "withdraw",
                type: "number",
                message: "How much do you want to withdraw:"
            })

            if(isNaN(withdrawAmount.withdraw)) {
                console.error("Please enter a valid numeric value.");
            } else if(withdrawAmount.withdraw <= 0) {
                console.error("Please enter a valid positive numeric vale.");
            } else if(user.balance < withdrawAmount.withdraw) {
                console.error("Your current balance doesn't have sufficient balance.");
            } else {
                user.balance -= withdrawAmount.withdraw
                console.log(`You have chosen to withdraw: ${withdrawAmount.withdraw}`);
                console.log(`Your remaining balance after withdrawal is: ${user.balance}`);

            }

        }

        if(atmMenu.menu === "Deposit Money") {

            console.log(`Your current balance is: ${user.balance}`);

            const depositAmount = await inquirer.prompt({
                name: "deposit",
                type: "number",
                message: "How much do you want to deposit:"
            })

            if(isNaN(depositAmount.deposit)) {
                console.log("Please enter a valid numeric value.")
            } else if(depositAmount.deposit <= 0) {
                console.error("Please enter a valid positive numeric vale.");
            } else {
                user.balance += depositAmount.deposit
                console.log(`You have chosen to deposit: ${depositAmount.deposit}`);
                console.log(`Your new balance after deposit is: ${user.balance}`);

            }

        }

        if(atmMenu.menu === "Exit") {
            console.log("Thanks for using the ATM. Goodbye!");
            break;
        }

    }
}

ATM()