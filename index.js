var githubLabelSync = require('github-label-sync');
const core = require('@actions/core');
const defaultLabels = require('./labels.json'); // Default labels file

const accessToken = core.getInput('access-token');
const repository = core.getInput('target-repository');
const labelsFile = core.getInput('labels-file');
const actionPath = `${__dirname}/..`;

console.log("labelsFile:", labelsFile);

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
