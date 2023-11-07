#!/bin/sh -l

github_token=$1
repository=$2
dry_run=$3

dry_run_arg=""
if $dry_run
then dry_run_arg="--dryRun"
fi

export GITHUB_ACCESS_TOKEN=$github_token

npx github-label-sync  -l 'labels.json' ${repository}