#!/bin/bash
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# nvm use default
mkdir -p /opt/sandbox/react-app
cd /opt/sandbox/react-app
rm -rf node_modules
npm i