# action-label-manager
<p align="center">
  <!-- <a href="https://github.com/outoforbitdev/action-label-manager/discussions">
    <img alt="Join the community on GitHub Discussions" src="https://img.shields.io/badge/Join%20the%20community-on%20GitHub%20Discussions-blue">
  </a> -->
  <a href="https://github.com/outoforbitdev/action-label-manager/actions/workflows/test.yml">
    <img alt="Test states" src="https://img.shields.io/github/actions/workflow/status/outoforbitdev/action-label-manager/test.yml?label=Tests">
  </a>
  <a href="https://github.com/outoforbitdev/action-label-manager/actions/workflows/release.yml">
    <img alt="Release states" src="https://img.shields.io/github/actions/workflow/status/outoforbitdev/action-label-manager/release.yml?label=Release">
  </a>
  <a href="https://securityscorecards.dev/viewer/?uri=github.com/outoforbitdev/action-label-manager">
    <img alt="OpenSSF Scorecard" src="https://api.securityscorecards.dev/projects/github.com/outoforbitdev/action-label-manager/badge">
  </a>
  <a href="https://github.com/outoforbitdev/action-label-manager/releases/latest">
    <img alt="Latest release" src="https://img.shields.io/github/v/release/outoforbitdev/action-label-manager?logo=github">
  </a>
  <a href="https://github.com/outoforbitdev/action-label-manager/issues">
    <img alt="Open issues" src="https://img.shields.io/github/issues/outoforbitdev/action-label-manager?logo=github">
  </a>
</p>

GitHub Action for running [github-label-sync](https://github.com/Financial-Times/github-label-sync#label-config-file).

## Usage

### Inputs

* `github-token`: Required. Your Github token to allow the action to update labels. If using a fine-grained token, the token must have read and write access to either `Issues` or `Pull requests`
* `repository`: Optional. The name of the repo in the format owner_name/repo_name. Defaults to the current repository
* `dry-run`: Optional. Whether this should be a dry run.

### Example
```
update-labels:
    runs-on: ubuntu-latest
    name: Update Labels
    steps:
      - name: Update Labels
        uses: outoforbitdev/action-update-labels@v1.0.0
        id: updatelabels
        with:
          github-token: ${{ secrets.LABEL_TOKEN }}
          dry-run: true
```