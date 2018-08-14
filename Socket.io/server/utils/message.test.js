var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',() => {
  it('should generate correct message object',() => {
    var from = "Gaurav";
    var text = "hey this is simple message";
    var value = generateMessage(from,text);

    expect(value).toHaveProperty('from',from);
    expect(value).toHaveProperty('text',text);
    expect(typeof value.createdAt).toBe('number');
  });
});
