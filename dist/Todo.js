import inquirer from "inquirer";
class Task {
    id;
    description;
    status;
    constructor(id, description, status = false) {
        this.id = id;
        this.description = description;
        this.status = status;
    }
}
let initialID = 1;
async function TodoMenu() {
    const todo = await inquirer.prompt([
        {
            name: "menu",
            type: "list",
            choices: ["Add Task", "View Tasks", "Mark Task as Complete", "Delete Task", "Exit"],
            message: "[Todo Menu] Select an option:"
        }
    ]);
    if (todo.menu === "Add Task") {
        await AddTask();
    }
    else if (todo.menu === "View Tasks") {
        await ViewTasks();
    }
    else if (todo.menu === "Mark Task as Complete") {
        await MarkTask();
    }
    else if (todo.menu === "Delete Task") {
        await DeleteTask();
    }
    else if (todo.menu === "Exit") {
        Exit();
    }
}
let storedTasks = [];
async function AddTask() {
    const addTask = await inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: "Add a new task:"
        }
    ]);
    const newTask = new Task(initialID++, addTask.add);
    console.log(`New task created:`, newTask);
    storedTasks.push(newTask);
    await TodoMenu();
}
async function ViewTasks() {
    console.log("\nYour tasks:\n");
    if (storedTasks.length === 0) {
        console.log("No tasks available");
    }
    else {
        storedTasks.forEach(task => {
            console.log(`${task.id}) ${task.description}. [${task.status ? "Completed" : "Not Completed"}]`);
        });
    }
    console.log("");
    await TodoMenu();
}
async function MarkTask() {
    const markChoices = storedTasks.map(task => ({
        name: `${task.id}: ${task.description}`,
        value: task.id
    }));
    const { mark } = await inquirer.prompt([
        {
            name: "mark",
            type: "list",
            choices: markChoices,
            message: "Select a task to mark as completed."
        }
    ]);
    const taskMarked = storedTasks.find(task => task.id === mark);
    if (taskMarked) {
        taskMarked.status = true;
        console.log(`Task ${taskMarked.id} marked as completed.`);
    }
    else {
        console.log("Task not found.");
    }
    await TodoMenu();
}
async function DeleteTask() {
    const delTask = storedTasks.map(task => ({
        name: `${task.id}: ${task.description}`,
        value: task.id
    }));
    const { delete: deletion } = await inquirer.prompt([
        {
            name: "delete",
            type: "list",
            choices: delTask,
            message: "Choose a task to delete."
        }
    ]);
    storedTasks = storedTasks.filter(task => task.id !== deletion);
    console.log(`Task with ID ${deletion} has been deleted.`);
    await TodoMenu();
}
async function Exit() {
    console.log("Thanks for using our app!");
    process.exit(0);
}
TodoMenu();
