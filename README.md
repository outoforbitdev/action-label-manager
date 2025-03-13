# action-label-manager
A GitHub Action designed to create a release based on the most recent changelog entry. 

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

## Inputs

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `access-token` | GitHub token with permissions to update labels (`issues: write`). | :white_check_mark: | N/A |
| `target-repository` | The name of the repository in which to update labels (e.g. `outoforbitdev/action-label-manager`). | :x: | `${{ github.repository }}$` |


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
```
