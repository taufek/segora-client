# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###
* Run setup

```
#!bash

npm install
```


* Install Grunt

```
#!bash
sudo npm install -g grunt-cli
```

* Install Bower

```
#!bash
sudo npm install -g bower
```

** Install compass

```
sudo gem install compass
```

** Bower setup

```
bower install
```

** Modify settings

```
Edit app/scripts/settings.js
```

** Build js
```
grunt build
```

** Run app
```
grunt serve
```

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### Push to staging (segora-dev)
git remote add heroku-staging https://git.heroku.com/segora-dev.git
git push heroku-staging staging:master
