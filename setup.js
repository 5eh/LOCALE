// Import the required modules
const readline = require('readline');
const fs = require('fs');
const process = require('process');

// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Sample names to select from, plus an option for file creation
const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Create a new name file'];

// Function to display the menu and handle user input
function displayMenu() {
    console.log('Please select a name by entering the corresponding number or create a name file:');
    names.forEach((name, index) => {
        console.log(`${index + 1}. ${name}`);
    });

    rl.question('Enter your choice: ', (answer) => {
        const index = parseInt(answer) - 1;
        if (index >= 0 && index < names.length - 1) {
            console.log(`You selected: ${names[index]}`);
            console.log(`Throwing out the name: ${names[index]}`);
            rl.close();
        } else if (index === names.length - 1) {
            createNameFile();
        } else {
            console.log('Invalid selection, please try again.');
            displayMenu(); // Display the menu again if the choice is invalid
        }
    });
}

// Function to create and write to a name file
function createNameFile() {
    fs.writeFile('name.txt', '', (err) => {
        if (err) throw err;
        console.log('Created an empty name.txt file.');
        rl.question('Enter a name to save in the file: ', (name) => {
            fs.writeFile('name.txt', name, (err) => {
                if (err) throw err;
                console.log(`Saved "${name}" in name.txt.`);
                rl.close();
            });
        });
    });
}

// Start the menu
displayMenu();

