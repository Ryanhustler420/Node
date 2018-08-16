const expect = require('expect');
const {isRealString} = require('./validation');

describe('validation',() => {
  it('should return true if we pass string',() => {
      var str = isRealString("this is simple pussy");
      expect(str).toBe(true);
  });

  it('should reject string with only spaces',() => {
    var str = isRealString("                         ");
    expect(str).toBe(false);
  });

  it('should not allow with non-space charcter value',() => {
    var str = isRealString(5454654);
    expect(str).toBe(false);
  });
});
