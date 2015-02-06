# Getting Started Guide

## Features


## Setting up Development Environment / Sandbox:

### Installation Requirements
* Install xcode
* Install latest version of Nodejs basically we need npm(Node Package module Manager) comes along with nodejs
* Install [git](http://git-scm.com/download/mac)

* grunt test depends on compass and compass depends on ruby, so install ruby first
Install Ruby Version Manager (RVM) with a Ruby
$ sudo \curl -L https://get.rvm.io | bash -s stable --ruby

#### installing Homebrew
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
Ignore
```
RVM Error
Icon
Ignore if you get following error and continue with next step
Can not find compiler and 'make' tool - make sure Xcode and/or Command Line Tools are installed.
```
```unix
$ brew doctor

$ sudo gem update --system
$ sudo gem install sass
$ sudo gem install compass

$ sudo npm install -g yo generator-angular
$ sudo npm install -g generator-angular

$ git clone https://github.com/kevendra/idea-box.git
$ cd idea-box/idea-box-ui
$ grunt serve
```
to generate dist
```unix
$ grunt
```