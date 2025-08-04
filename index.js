var githubLabelSync = require('github-label-sync');
const core = require('@actions/core');

const accessToken = core.getInput('access-token');
const repository = core.getInput('target-repository');
const labelsFile = core.getInput('labels-file');
const DEFAULT_LABELS_FILE = `${process.env.GITHUB_ACTION_PATH}/labels.json`;

console.log("labelsFile:", labelsFile);
console.log("defaultLabelsFile:", DEFAULT_LABELS_FILE);

const defaultLabels = JSON.parse(require('fs').readFileSync(DEFAULT_LABELS_FILE, 'utf8'));
let labels = [];

if (labelsFile !== "") {
    try {
        labels = JSON.parse(require('fs').readFileSync(labelsFile, 'utf8'));
        syncLabels(
            accessToken, 
            repository, 
            labels, 
            () => {
                console.log(`Labels synced from custom file: ${labelsFile}`);
            },
            () => { syncDefaultLabels(accessToken, repository, defaultLabels);}
        );
    } catch (error) {
        console.error(`Failed to read labels from custom file: ${labelsFile}`, error);
        syncDefaultLabels(accessToken, repository, defaultLabels);
    }
} else {
    console.log(`No custom labels file provided, syncing default labels.`);
    syncDefaultLabels(accessToken, repository, defaultLabels);
}



function syncLabels(accessToken, repository, labels, success, failure) {
    githubLabelSync({
            accessToken: accessToken,
            repo: repository,
            labels: labels,
        }).then((diff) => {
            console.log(diff);
            success();
        }).catch((error) => {
            console.error(`Error syncing labels:`, error);
            failure();
        });
}

function syncDefaultLabels(accessToken, repository, labels) {
    syncLabels(accessToken, repository, labels, () => {
        console.log("Labels synced from default file.");
    }, () => {
        console.error(`Failed to sync labels from default file: ${labels}`);
    });
}
