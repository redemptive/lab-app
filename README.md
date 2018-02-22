# Sparta Global Lab Repository

## Getting Started

### How to get the Code for the Lab

It is important that you fork this lab repository (repo) and then clone it to your own GitHub repository. Any changes you make must be made on your local machine before being pushed to GitHub. Any lines that should be run in terminal are enclosed in boxes below. 

	git clone [ADD YOUR SSH LINK HERE] lab-name
	git checkout -b develop
	npm run spartalab

* Open Terminal
* Fork this repo: <https://github.com/spartaglobal/ExampleLab>
* In your GitHub repos open the recently forked version of this repo.
* Clone the repo, preferably with SSH, to your local machine.
* Once cloned, make sure to checkout to the Dev branch before starting the lab: `git checkout -b develop`
* Type in `npm run spartalab` to finish setup
* You are now ready to begin the lab

### How to Submit Code for Lab Review

	git add .
	git commit -m "Add your commit comment here"
	git checkout master
	git merge develop
	git push origin master

* After completing your lab, `git add .` and `git commit -m "Add your commit comment here"` to add and stage changes
* `git checkout master` to switch from develop branch to the master branch
* `git merge develop` to merge your develop branch to master
* `git push origin master` to push your code to the master branch of your forked lab repository on GitHub
* Locate the pull request button, on your forked repo, add comments to the pull request and wait for the instructor to review the work

### Configure GitHub user name on Local Machine
	git config --global user.name YOURNAMEHERE

* Configure your name on machine, so that Slack notifications will be under your name. Use your real name when doing this configuration - replace YOURNAMEHERE with your name. `git config --global user.name YOURNAMEHERE`

### Configure Slack ID to show lab build status

* Get the Slack ID by:
	* Click on your Slack profile inside slack UI
	* Click on Profile & Account
	* Click on More Actions under your name
	* Click copy Member ID
	* Open this README.md and edit the below **SlackStudentID**
	* Replace YOURIDHERE and paste in your Member ID
	* Contact your instructor after you have found your Member ID. Your 		Instructor will need to give you their **SlackTrainerID**
	*	Do the same for **SlackTrainerID** and replace TRAINERIDHERE with your 		instructors slack member ID 
	* Note there is one space after the colon :
				
* Edit these below:

		SlackStudentID: YOURIDHERE

		SlackTrainerID: TRAINERIDHERE

## Working on the Lab

### Running Unit Tests #
	rspec
* `rspec` to run tests

### Linting

Linting is a process that checks source code for both stylistic and programmtic errors. It uses style guides to help a developer write the best possible code. There are many useful Linters. These include: 

* JSLint
* CSSlint 
* JHint
* PyLint

Eslint uses a javascript linting plugin. This also assumes you have node installed on your local machine. 

The following steps descibe how to use eslint, so that you can immediately check for mistakes you may have made in your lab work. 

#### Using Eslint
	npm install -g eslint
	npm install pre-commit --save-dev
	eslint "filename"

* Move into your local directory 
* Run the command `npm install -g eslint` to install eslint
* Install the pre-commit dependency with `npm install pre-commit --save-dev` 
* Once installed, Eslint can be run using `eslint "filename"`

#### Running using Git 
	npm install -g eslint
	npm install pre-commit --save-dev
	git add .
	git commit -m "Add your commit comment here"
	
* Move into your local directory 
* Run the command `npm install -g eslint` to install eslint
* Install the pre-commit dependency with `npm install pre-commit --save-dev` 
* Once a change has been made `git add .`
* Then use `git commit -m "Add your commit comment here"`
* Eslint test will automatically run
* Will prevent you from progressing if test returns errors