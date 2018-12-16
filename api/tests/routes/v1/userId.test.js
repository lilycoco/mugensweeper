const chai = require('chai');
const app = require('../../../routes/app.js');

describe('ユーザー名・ID登録', () => {
  it('ユーザー名の文字数は3~7文字', async () => {
    // 1: Given
    const nameList = [
      { name: 'ss', judge: false },
      { name: 'tttt', judge: true },
      { name: 'jjjjjjjjjjjj', judge: false },
      { name: '#$%w', judge: false },
    ];

    // 2: When
    const results = [];
    for (let i = 0; i < nameList.length; i += 1) {
      const { name } = nameList[i];
      const { body } = await chai
        .request(app)
        .post('/v1/userId')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name });
      results.push(body);
    }

    // 3: Then
    results.forEach((r, i) => {
      expect(r).toBe(nameList[i].judge ? 200 : 401);
    });
  });
});