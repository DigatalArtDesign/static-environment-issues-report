# Static Environmetal issues report page
### Main structure of pages 

- **index.html** Route: `/`. Represents a Landing page of application. Purpose: Engage auditory and introduce the application mission
- **contact.html** Route: `/contact.html`. A form page of application. Purpose: Report issue anf Contact with our department
- **404.html** Route `/404.html`. A page which identifies an error in route path. 


### Dependencies 
Could be found in `package.json` file.

### How to work with git
#### clone repo
`git clone git@clone.git`
#### check git status (will show which files are untracked by commit)
`git status`
#### check last commits
`git log`
#### checkout to a branch
`git checkout branchname`
#### create new branch
`git checkout -b branchname`
#### check current branch
`git branch`
#### For adding to current git state (all files) 
`git add .`
##### For adding to current git state (single file) 
`git add filepath/filename`

#### For Recording changes to the current repository
`git commit -m "message_type: message content"`

#### Download objects and refs from another repository
`git fetch`

#### Merging another repository to current one
`git merge repository_name`

#### For more info about git type
`git --help` or `git -h`

### How to run?
#### For first static server run 
`npm run start`
#### For development version on localhost
`npm run dev`
#### Build
`npm run build`


### Linting
#### In current implementation files should be checked before commiting them. 
**Run** `npm run lint` for common linting, `npm run lint:css` for css linting, and `npm run lint:html` for html linting
###### Important! To see linting errors in your IDE(pref. Visual Stiduo Code), download plugins for linters. 
For more information how to do it go to page [Visual Code Tutorial](https://code.visualstudio.com/docs/editor/extension-gallery) 
