#! /bin/bash

git reset --hard
git pull --rebase
npm update

echo 'Please restart application to affect new changes'
