// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// A function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    err ? console.log(err) : console.log("File created succesfully!");
  });
}

function getDescription(answer) {
  console.log(`inside getDescription function ${answer}`);
  return fetch(`https://api.github.com/licenses/${answer}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const description = data.description;
      // console.log(description);
      return description;
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
      return getDescription(answers.license).then((licenseDescription) => {
        return { licenseDescription, answers };
      });
    })
    .then((data) => {
      console.log(data.licenseDescription);
      console.log(data.answers.license);
      const badgeUrl = `https://img.shields.io/badge/license-${data.answers.license}-GREEN.svg`;

      const markdownBadge = `![License](${badgeUrl})`;

      const readmeContent = `
# ${data.answers.title}

${markdownBadge}

## Table of contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Questions](#Questions)

## Description

${data.answers.description}

## Installation

${data.answers.installation}

## Usage
${data.answers.usage}

## ${data.answers.license} License
${data.licenseDescription}

${data.answers.description}

## Contributing
${data.answers.contributing}

## Tests
${data.answers.tests}

## Questions
https://github.com/${data.answers.github}

Feel free to reach out to the following email with any questions or suggestions.
${data.answers.email}

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
