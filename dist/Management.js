import inquirer from "inquirer";
class Student {
    firstName;
    lastName;
    studentID;
    courses = [];
    balance = 0;
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        // Generates a no: 0.056789 ==> 5678.9 ==> 5678 ==> "5678" ==> 05678
        return Math.floor(Math.random() * 100000).toString().padStart(5, "0");
    }
    async enrollCourse() {
        const availableCourse = ["Project Management", "Supply Chain Management", "Metrology", "Economics", "Adv. Robotics"];
        const remainingCourses = availableCourse.filter(course => !this.courses.includes(course));
        if (remainingCourses.length === 0) {
            console.log("You have already enrolled in all courses available.");
            return;
        }
        const { course } = await inquirer.prompt({
            name: "course",
            type: "list",
            choices: remainingCourses,
            message: "Choose a course to enroll in summer semester"
        });
        this.courses.push(course);
        const courseFee = 10000; // Currency (pkr.)
        this.balance += courseFee;
        console.log(`You have successfully enrolled in ${course} course. Your new balance is ${this.balance}`);
    }
    async viewBalance() {
        console.log(`Your current balance is Rs. ${this.balance}.`);
    }
    async payTuition() {
        if (this.balance === 0) {
            console.log("You have no balance to pay.");
            return;
        }
        while (true) {
            const { pay } = await inquirer.prompt({
                name: "pay",
                type: "number",
                message: "How much would you like to pay?"
            });
            if (pay === 0) {
                console.log("Payment canceled");
                break;
            }
            if (isNaN(pay)) {
                console.log("Please enter a valid numeric value.");
            }
            else if (pay < 0) {
                console.log("Please enter a valid positive numeric value.");
            }
            else if (pay > this.balance) {
                console.log(`You can not pay more than your current balance of Rs. ${this.balance}`);
            }
            else {
                this.balance -= pay;
                console.log(`Payment of Rs. ${pay} was successful. Your new balance is Rs. ${this.balance}`);
                break;
            }
        }
    }
    async showStatus() {
        console.log(`Student Name: ${this.firstName} ${this.lastName}`);
        console.log(`Student ID is ${this.studentID}`);
        if (this.courses.length === 0) {
            console.log("Enrolled Courses: No courses enrolled yet.");
        }
        else {
            console.log("Enrolled Courses:");
            this.courses.forEach((course, index) => {
                console.log(`${index + 1}) ${course}`);
            });
        }
        console.log(`Current Balance is: Rs. ${this.balance}.`);
    }
}
async function MainMenu(student) {
    while (true) {
        const { menu } = await inquirer.prompt([
            {
                name: "menu",
                type: "list",
                choices: ["Enroll in a course", "View balance", "Pay tuition", "Show status", "Exit"],
                message: "Please select an option:"
            }
        ]);
        if (menu === "Enroll in a course") {
            await student.enrollCourse();
        }
        else if (menu === "View balance") {
            await student.viewBalance();
        }
        else if (menu === "Pay tuition") {
            await student.payTuition();
        }
        else if (menu === "Show status") {
            await student.showStatus();
        }
        else if (menu === "Exit") {
            console.log("Thanks for using our Student Management System.");
            break;
        }
    }
}
const student = new Student("Saif", "Ali");
MainMenu(student);
