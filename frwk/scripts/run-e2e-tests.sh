#!/bin/bash

cd $HOME

echo '############################################################'
echo '############### Xvfb settings'

Xvfb :21 -screen 0 1024x768x24 &
export DISPLAY=:21
#export DISPLAY=:10

echo '############################################################'
echo '############### Starting Webdriver and Http-server'

# update app dependencies
npm install

webdriver-manager start &

#  Started HttpContext[/,/]

sleep 10
echo
echo '############################################################'
echo '############### Running Test suite'

protractor $TEST_FILE