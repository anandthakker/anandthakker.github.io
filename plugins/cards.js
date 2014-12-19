
var fs = require('fs')

module.exports = function(env, callback) {
  _ = env.locals._;
  
  env.helpers.getCardData = getCardData;
  function getCardData(contents, path) {
    var ret = [];
    path = path ? path : []
    for(x in contents)
    {
      var item = contents[x];
      if(item.url) {
        ret.push({
          key: path.concat(x),
          url: item.url,
          metadata: item.metadata,
          content: item.markdown
        });
      }
      else {
        ret.push.apply(ret, getCardData(item, path.concat(x)));
      }
    }
    return ret;
  }
  
  env.helpers.getPropertyPath = function(content, path) {
    var prop, obj = content;
    while(prop = path.shift()) obj = obj[prop];
    return obj;
  }
  
  return callback();
}
