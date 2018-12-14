const format = require('string-template');
const { commentIssue } = require('../../lib/github');

const matchedLabel = ['Need Reproduce', 'need-more-information', 'not follow template'];
const comment = `
Hello @{user}. Please provide a reproducible example following the [instruction](https://github.com/eggjs/egg/issues/3310).

Issues labeled by \`Need Reproduce\` will be closed if no activities in 7 days.

---

@{user}，请根据[这个说明](https://github.com/eggjs/egg/issues/3310)提供最小可复现代码。

如果在 7 天内没有进展会被自动关闭。
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
