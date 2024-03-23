#!/bin/bash

# Check if no arguments are provided
if [ $# -eq 0 ]; then
    echo "[$(date "+%Y-%m-%d %H:%M:%S")] Error: No parameters provided. Operation aborted."
    exit 1
fi

# Construct the commit message
if [ $# -eq 2 ]; then
    msg="feat: done $1 - $2"
else
    msg="feat: done $1"
fi

# Log the commit message being used
echo "[$(date "+%Y-%m-%d %H:%M:%S")] Committing with message: '$msg'"

# Attempt to perform the git commit
git commit -m "$msg"
if [ $? -eq 0 ]; then
    echo "[$(date "+%Y-%m-%d %H:%M:%S")] Commit successful."
else
    echo "[$(date "+%Y-%m-%d %H:%M:%S")] Commit failed."
fi
