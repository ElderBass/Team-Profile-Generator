# Team Profile Generator

An application to generate a nice, neat HTML file of a user's project team, based on the user's input.

Created by Seth Zygarlicke.

### __Links__

Deployed: https://elderbass.github.io/Team-Profile-Generator/

GitHub Repository: https://github.com/ElderBass/Team-Profile-Generator.git

# Table of Contents

* [Description](#description)

* [Installation](#installation)

* [Technologies](#technologies)

* [Testing](#testing)

* [Demonstration](#demonstration)
    
* [Questions](#questions)


# Description

This application allows a user to generate a webpage for their project's team. The application starts by prompting the user to input information about the team's manager. Once passed in, the application asks if the user would like to keep adding employees. They can choose from a list of options - Manager, Engineer, and Intern. 

After the user has completed entering their team members, they can select the 'Finish' option from a prompt. Upon selecting this, one final prompt asks the user to name their project or team. Once done and the user makes their final submission, a new folder pops up in the repository named 'dist'. Inside this dist folder is another folder with their project/team's name on it, which houses a newly generated index.html file, displaying all of their team members in a neat, stylized grid. Also within this project folder will be the style.css that was used to enhance the aesthetic of the index.html file. 

# Technologies

This is a node.js application, whose major dependencies include the __inquirer__ npm package for gathering the user's input via prompts, and the devDependency of __jest__ for testing the application's various functions.  

This project was coded using __VS Code__.

# Installation 

To run this application, first open the repository with some sort of code compiler (e.g. VS Code, which was used to create this project). All of the packages have already been installed, thus to run the application, right click on the __index.js__ file and from the dropdown select the option __'Open in Integrated Terminal'__. This will reveal a new terminal window at the bottom of your coding window. 

In the command line of this new window, simply type __node index.js__ to run the index.js file. You will then see the 'intro' prompt, welcoming you to the Team Profile Generator application, before being navigated directly into the set of prompts for generating a manager. 

# Testing

To test this application, enter the following command in your terminal:

```
npm run test
```

# Demonstration

To view a demonstration of this application and how to test it, follow this link:

[Team Profile Generator Demonstration](https://drive.google.com/file/d/1yVEBsY_OqGlqgzaX50RhWLNsjBpzxZEP/view)

# Questions

If you wish to contribute to this repository or have questions for the creator, please email Seth at [zygster11@gmail.com](mailto:zygster11@gmail.com)

To view more projects by Seth, visit his [GitHub Profile](https://github.com/ElderBass).