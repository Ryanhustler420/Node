var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage',() => {
  it('should generate correct location object',() => {
    var from = "Admin";
    var latitude = 29.35684;
    var longitude = -75.25469;
    var value = generateLocationMessage(from,latitude,longitude);
    expect(typeof value.createdAt).toBe('number');
    expect(value.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
  });
});
