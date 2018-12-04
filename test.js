const translate = require('google-translate-api');


translate('我', { from: 'zh-CN', to: 'en' })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
