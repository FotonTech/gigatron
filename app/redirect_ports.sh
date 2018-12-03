#!/usr/bin/env bash

# packager
adb reverse tcp:8081 tcp:8081
adb -d reverse tcp:8081 tcp:8081
adb -e reverse tcp:8081 tcp:8081

# Storybooks
adb reverse tcp:7007 tcp:7007
adb -d reverse tcp:7007 tcp:7007
adb -e reverse tcp:7007 tcp:7007

# GraphQL
adb reverse tcp:5001 tcp:5001
adb -d reverse tcp:5001 tcp:5001
adb -e reverse tcp:5001 tcp:5001