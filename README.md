# Static Environmetal issues report page
### Main structure of pages 

- **index.html** Route: `/`. Represents a Landing page of application. Purpose: Engage auditory and introduce the application mission
- **contact.html** Route: `/contact.html`. A form page of application. Purpose: Report issue anf Contact with our department
- **404.html** Route `/404.html`. A page which identifies an error in route path. 
- **redirected.html** Route `/redirected.html`. Accessable by redirect from `/contact.html`, after submitting the form. Receives data from backend(json or firebase depending on your preference). Has biult-in table-creation class from json-like object. Is capable of printing table data `pdf` and download it. 


### How to run?
#### Local server and parcel server

##### For first static server run 
`npm run build:local`
##### For development version on localhost
`npm run dev:local`
##### For backend server run **be aware that json-server and firebase server do not share same data!**
`npm run host:local`
##### Build and run both backend and front-end
`npm run start:local`


#### Local server with firebase
##### Create local firebase based server
##### For frontend
`npm run firebase-frontend:local`
##### For backend
`npm run firebase-backend:local`
##### Altogether
`npm run firebase:local`

##### For firebase deploy (**use it only if you have a stable version of application**)
`npm run firebase:deploy`


### Dependencies 
Could be found in `package.json` file (backend-deps are found in `/api/package.json` for **json.server** and in `/functions/package.json` for firebase). 

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


### Linting
#### In current implementation files should be checked before commiting them. 
**Run** `npm run lint` for common linting, `npm run lint:css` for css linting, and `npm run lint:html` for html linting
###### Important! To see linting errors in your IDE(pref. Visual Stiduo Code), download plugins for linters. 
For more information how to do it go to page [Visual Code Tutorial](https://code.visualstudio.com/docs/editor/extension-gallery) 
