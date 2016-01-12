// validation-util.js
//============================================================
// Create new regex from multiple line string, zipped up w/join
// No regex flags: RegExp(string, flags)
// NOTE: Regex backslashes must be escaped since this is not a literal regex!
// No regex subgroupings js?
let ipRangeRegex = new RegExp([
  '\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
  '\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
  '\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
  '\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b'
].join(''), '');

let CIDRFormatRegex = /\/(3[0-2]|[1-2]?[0-9])$/;

let ValidationUtil = {
  validateIpRange(testString) {
    return ipRangeRegex.test(testString.trim());
  },
  validateCIDRFormat(testString) {
    return CIDRFormatRegex.test(testString.trim());
  },
  validateIpRangeAndFormat(testString) {
    return this.validateIpRange(testString) &&
      this.validateCIDRFormat(testString);
  }
};

export default ValidationUtil;