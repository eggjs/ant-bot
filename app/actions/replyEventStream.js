const { commentIssue, closeIssue } = require('../../lib/github');

// https://github.com/eggjs/egg/issues/3238
function matchKeyword(title, body) {
  if (title.includes('event-stream')) return true;
  if (body.includes('event-stream')) return true;
  return false;
}

function replyEventStream(on) {
  on('issues_opened', ({ payload }) => {
    if (matchKeyword(payload.issue.title, payload.issue.body)) {
      const content = 'Duplicated #3238';

      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: content,
      });

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
      });
    }
  });
}

module.exports = replyEventStream;
