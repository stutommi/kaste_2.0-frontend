#!/bin/sh
echo creating new build
npm run build
echo deleting old build
rm -rf ../kaste_2.0-backend/build
echo moving new build
cp -r build ../kaste_2.0-backend/build
echo done