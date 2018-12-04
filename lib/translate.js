'use strict';

const urllib = require('urllib');

const URL_PREFIX = 'https://translate.google.com/translate_a/single?client=webapp&sl=zh-CN&tl=en&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=4&tsel=0&kc=3&tk=827012.660931&q=';

async function translate(text) {
  const url = URL_PREFIX + encodeURIComponent(text);
  const res = await urllib.request(url, {
    dataType: 'json',
    headers: {
      Host: 'translate.google.com',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
    },
  });
  return res.body;
}

module.exports = translate;
