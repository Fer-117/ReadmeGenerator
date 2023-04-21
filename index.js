// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// A function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    err ? console.log(err) : console.log("File created succesfully!");
  });
}

function showQuestions(licenses) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of your project?",
      },
      {
        type: "input",
        name: "description",
        message: "Write a description of your project: ",
      },
      {
        type: "input",
        name: "installation",
        message: "What are the installation instructions?",
      },
      {
        type: "input",
        name: "usage",
        message: "What is the usage information?",
      },
      {
        type: "checkbox",
        name: "license",
        message: "What license applies to your project?",
        choices: licenses,
      },
      {
        type: "input",
        name: "contributing",
        message: "What are the contribution guidelines?",
      },
      {
        type: "input",
        name: "tests",
        message: "What are the test instructions?",
      },
      {
        type: "input",
        name: "github", // github profile
        message: "What is your github username?",
      },
      {
        type: "input",
        name: "email", //email
        message: "What is your email?",
      },
    ])
    .then((answers) => {
      const readmeContent = `
      # ${answers.title}
      
      ## Table of contents
      - [Description](#Description)
      - [Installation](#Installation)
      - [Usage](#Usage)
      - [License](#License)
      - [Contributing](#Contributing)
      - [Questions](#Questions)
      
      ## Description
      
      ${answers.description}
      
      ## Installation
      
      ${answers.installation}
      
      ## Usage
      ${answers.usage}
      
      ## License
      ${answers.license}
      
      ## Contributing
      ${answers.contributing}
      
      ## Tests
      ${answers.tests}
      
      ## Questions
      https://github.com/${answers.github}
      
      ${answers.email}
      
      `;
      writeToFile("README.md", readmeContent);
    });
}

function getLicenses() {
  const url = "https://api.github.com/licenses";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const licenses = data.map((license) => {
        return { name: license.name, value: license.key };
      });
      showQuestions(licenses);
    });
}

// TODO: Create a function to initialize app
function init() {
  console.log("App initialized!");
  getLicenses();
}

// Function call to initialize app
init();
