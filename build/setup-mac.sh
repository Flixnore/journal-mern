#!/bin/bash

# install homebrew, uncomment if necessary
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew update
brew install node
brew install mysql
sudo services mysql start

cd ../frontend && npm install
cd ../backend && npm install
