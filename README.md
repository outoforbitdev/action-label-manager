# action-label-manager

> [!WARNING]
> This action is deprecated and no longer maintained. Use the [`label-manager.yml` reusable workflow](https://github.com/outoforbitdev/reusable-workflows-library#label-manageryml) instead.

A GitHub Action to sync labels to a standard set.

<p>
  <a href="https://github.com/outoforbitdev/action-label-manager/actions?query=workflow%3ATest">
    <img alt="Test build states" src="https://github.com/outoforbitdev/action-label-manager/workflows/Test/badge.svg">
  </a>
  <a href="https://github.com/outoforbitdev/action-label-manager/actions?query=workflow%3ARelease+branch%3Amaster">
    <img alt="Release build states" src="https://github.com/outoforbitdev/action-label-manager/workflows/Release/badge.svg">
  </a>
  <a href="https://securityscorecards.dev/viewer/?uri=github.com/outoforbitdev/action-label-manager">
    <img alt="OpenSSF Scorecard" src="https://api.securityscorecards.dev/projects/github.com/outoforbitdev/action-label-manager/badge">
  </a>
  <a href="https://github.com/outoforbitdev/action-label-manager/releases/latest">
    <img alt="Latest github release" src="https://img.shields.io/github/v/release/outoforbitdev/action-label-manager?logo=github">
  </a>
  <a href="https://github.com/outoforbitdev/action-label-manager/issues">
    <img alt="Open issues" src="https://img.shields.io/github/issues/outoforbitdev/action-label-manager?logo=github">
  </a>
</p>

## Migrating to the reusable workflow

The default labels now live in [`src/labels.json`](https://github.com/outoforbitdev/reusable-workflows-library/blob/main/src/labels.json) in `reusable-workflows-library`.

Replace the job that uses `outoforbitdev/action-label-manager@...` with a call to the reusable workflow:

```yml
name: Sync Labels
on:
  issues:
    types:
      - opened
      - labeled
  pull_request:
    types:
      - opened
      - labeled

permissions: {}

jobs:
  labels:
    permissions:
      issues: write
    uses: outoforbitdev/reusable-workflows-library/.github/workflows/label-manager.yml@<version>
    # Optional: replace the default labels with your own file.
    # with:
    #   labels-file: labels.json
```

| Action input | Reusable workflow equivalent |
|--------------|------------------------------|
| `access-token` | Optional `access-token` secret. Defaults to `GITHUB_TOKEN`. |
| `target-repository` | `target-repository` input. Defaults to the calling repository. |
| `labels-file` | `labels-file` input. |

The workflow does not require a checkout step. Existing tags and releases of this action remain available, so workflows pinned to it keep working.

## Inputs (deprecated)

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `access-token` | GitHub token with permissions to update labels (`issues: write`). | :white_check_mark: | N/A |
| `target-repository` | The name of the repository in which to update labels (e.g. `outoforbitdev/action-label-manager`). | :x: | `${{ github.repository }}$` |
| `label-file` | The name of a json file with custom labels. | :x: | [default labels](https://github.com/outoforbitdev/action-label-manager/blob/main/labels.json) |


## Usage

To use this action in your GitHub workflow, add the following step to your .github/workflows/labels.yml file:
```yml
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Sync labels
        uses: outoforbitdev/action-label-manager@latest
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          target-repository: ${{ github.repository }}
          label-file: labels.json
```
