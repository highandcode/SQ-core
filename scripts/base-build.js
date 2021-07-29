class BaseBuild {
  constructor(options = {}) {
    this.localVars = {
      start: '<!-- LOCAL_CONFIG_REMOVE_START -->',
      end: '<!-- LOCAL_CONFIG_REMOVE_END -->'
    };
    this.localTags = {
      start: '<!-- LOCAL_TAGS_REMOVE_START -->',
      end: '<!-- LOCAL_TAGS_REMOVE_END -->'
    };
  }
  
  removeContent(fullContent, beforeWhat, tillWhat) {
    // get the position before which newContent has to be added
    const posStart = fullContent.indexOf(beforeWhat);
    const posEnd = fullContent.indexOf(tillWhat);
    const part1 = fullContent.substring(0, posStart);
    const part2 = fullContent.substring(posEnd + tillWhat.length);
    return part1 + part2;
  }
}

module.exports = BaseBuild;