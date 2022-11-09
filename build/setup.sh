#!/bin/bash

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt install mysql-server

cd ../frontend && npm install
cd ../backend && npm install
