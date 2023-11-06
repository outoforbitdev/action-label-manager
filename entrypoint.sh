#!/bin/sh -l

github_token=$1
repo_owner=$2
repo_name=$3
dry_run=$4

dry_run_arg=""
if $dry_run
then dry_run_arg="--dryRun"
fi

export GITHUB_ACCESS_TOKEN=$github_token

npx github-label-sync  -l 'labels.json' ${repo_owner}/${repo_name}