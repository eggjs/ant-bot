'use strict';

const format = require('string-template');
const { commentIssue, closeIssue, getMembers, addLabels } = require('../../lib/github');
const { isIssueValid } = require('../../lib/utils');

const comment =
  '\
Hello @{user}, your issue has been closed because it does not conform to our \
issue requirements. Please use the [Issue Helper](http://new-issue.ant.design?repo={repo}) \
to create an issue, thank you!';

'use strict';

let members = [];
const repos = [ 'ant-design' ];

function replyInvalid(on) {
  getMembers((error, res) => {
    members = res.data.map(m => m.login);
  });

  on('issues_opened', ({ payload, repo }) => {
    if (repos.indexOf(repo) === -1) {
      return;
    }
    const { issue } = payload;
    const opener = issue.user.login;
    if (!isIssueValid(issue) && !members.includes(opener)) {
      commentIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        body: format(comment, { user: opener, repo }),
      });

      closeIssue({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
      });

      addLabels({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        number: payload.issue.number,
        labels: [ 'Invalid' ],
      });
    }
  });
}

module.exports = replyInvalid;
