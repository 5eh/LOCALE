import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(`
███████╗██████╗  ██████╗██████╗  ██████╗  ██████╗██╗     ██╗
██╔════╝██╔══██╗██╔════╝╚════██╗██╔═████╗██╔════╝██║     ██║
█████╗  ██████╔╝██║      █████╔╝██║██╔██║██║     ██║     ██║
██╔══╝  ██╔══██╗██║     ██╔═══╝ ████╔╝██║██║     ██║     ██║
███████╗██║  ██║╚██████╗███████╗╚██████╔╝╚██████╗███████╗██║
╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝ ╚═════╝  ╚═════╝╚══════╝╚═╝
`);

const options = ["Sends xcUNIT", "Exit"];

console.log("---------------------------");
console.log("YOUR ARE ONE MOONBASE ALPHA");
console.log("---------------------------");
console.log("Select an option:");

options.forEach((option, index) => {
  console.log(`${index + 1}. ${option}`);
});

process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  const choice = parseInt(data.toString().trim());
  if (choice >= 1 && choice <= options.length) {
    switch (choice) {
      case 1:
        asking_xcUNIT();
        break;
      case 2:
        process.exit();
    }
  }
});

function asking_xcUNIT() {
  const prompts = [
    "What is your private key\n",
    "What RPC URL you wanna use?\n",
    "How much you wanna send?\n",
    "What is the account Address on the destionation\n",
    "Wanna Transfer?\n",
  ];

  const answers = [];
  let index = 0;

  const askQuestion = () => {
    process.stdout.write(prompts[index]);
  };

  process.stdin.on("data", (data) => {
    answers.push(data.toString().trim());
    index++;

    if (index === prompts.length) {
      fs.readFile(__dirname + "/transfer_template.js", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        // Replace placeholders in the file content
        const modifiedContent = replacePlaceholders(data);

        // Write the modified content back to the file
        fs.writeFile(
          __dirname + "/my_great_caller.js",
          modifiedContent,
          "utf8",
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Placeholders replaced successfully!");
          }
        );
      });

      console.log("Thank you for answering the questions.");
      console.log("Answers:", answers);
      process.stdin.pause();
    } else {
      askQuestion();
    }
  });

  askQuestion();
}

//!TODO
function replacePlaceholders(content) {
  return content
    .replace(/{{PRIVATE_KEY}}/g, "{{APRIVATEKEY}}")
    .replace(/{{RPC_URL}}/g, "{{ARPCURL}}")
    .replace(/{{AMOUNT}}/g, "{{AAMOUNMT}}")
    .replace(/{{DESITINATION_ACCOUNT}}/g, "{{ANDESITONACCOUNT}}");
}
