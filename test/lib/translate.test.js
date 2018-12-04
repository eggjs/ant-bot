'use strict';

const assert = require('assert');
const translate = require('../../app/lib/translate');

describe('test/lib/translate.test.js', () => {

  it('should translate', async () => {
    const res = await translate('我');
    assert(res.text === 'I');
  });

});
