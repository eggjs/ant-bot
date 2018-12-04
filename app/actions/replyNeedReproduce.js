const format = require('string-template');
const { commentIssue } = require('../../lib/github');

const matchedLabel = ['Need Reproduce', 'need-more-information', 'not follow template'];
const comment = `
Hello @{user}. Please provide a reproducible example by creating a github repo.

Issues labeled by \`Need Reproduce\` will be closed if no activities in 7 days.
`;

function replyNeedReproduce(on) {
  on('issues_labeled', ({ payload, repo }) => {
    if (repo !== 'egg') return;
    if (matchedLabel.includes(payload.label.name)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, { user: payload.issue.user.login }),
      });
    }
  });
}

module.exports = replyNeedReproduce;
